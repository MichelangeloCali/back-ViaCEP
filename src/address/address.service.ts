import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from './entities/address.entity';
import { AddressRepository } from './address.repository';
import { RedisService } from '../redis/redis.service';

type viaCepResponseType = {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
};

type AddressResponse =
  | Omit<Address, 'id'>
  | { statusCode: number; message: string };

@Injectable()
export class AddressService {
  constructor(
    private readonly httpService: HttpService,
    private readonly redisService: RedisService,
    private readonly addressRepository: AddressRepository,
  ) {}

  private async createAddress(createAddressDto: CreateAddressDto) {
    await this.addressRepository.createAddress(createAddressDto);
    await this.redisService.saveAddress(createAddressDto.cep, createAddressDto);
    return;
  }

  private async findAddressFromApi(cep: string): Promise<Omit<Address, 'id'>> {
    try {
      const response: AxiosResponse<viaCepResponseType> = await firstValueFrom(
        this.httpService.get(`${process.env.VIA_CEP_BASE_URl}/${cep}/json`),
      );

      const result = {
        cep: response.data.cep.replace('-', ''),
        neighborhood: response.data.bairro,
        street: response.data.logradouro,
        city: response.data.localidade,
      };

      return result;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Erro ao buscar CEP, tente outro CEP.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async findOneAddress(cep: string) {
    return this.addressRepository.findOneAddress(cep);
  }

  async findAddress(cep: string): Promise<AddressResponse> {
    try {
      this.validateSearch(cep);

      const redisCep = await this.redisService.getAddress(cep);
      if (redisCep) {
        return redisCep;
      }

      const dbCep = await this.findOneAddress(cep);
      if (dbCep) {
        const result = {
          cep: dbCep.cep,
          neighborhood: dbCep.neighborhood,
          street: dbCep.street,
          city: dbCep.city,
        };
        await this.redisService.saveAddress(cep, result);
        return result;
      }

      const viacep = await this.findAddressFromApi(cep);
      if (!dbCep) {
        await this.createAddress(viacep);
      }
      return viacep;
    } catch (error) {
      if (error instanceof Error) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message,
        };
      } else {
        console.error(error);
        throw new HttpException(
          'Erro interno do servidor',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  validateSearch(cep: string): void {
    if (cep.length !== 8) {
      throw new Error('CEP inválido. Um CEP válido contém 8 dígitos');
    }
    if (!/^\d{8}$/.test(cep)) {
      throw new Error(
        'CEP inválido. Um CEP válido contém apenas dígitos numéricos',
      );
    }
  }
}
