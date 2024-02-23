import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
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
  erro?: 'true' | 'false';
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
    await this.redisService.saveAddress(
      createAddressDto.postalCode,
      createAddressDto,
    );
    return;
  }

  private async findAddressFromApi(
    postalCode: string,
  ): Promise<Omit<Address, 'id'>> {
    try {
      const response: AxiosResponse<viaCepResponseType> = await firstValueFrom(
        this.httpService.get(
          `${process.env.VIA_CEP_BASE_URl}/${postalCode}/json`,
        ),
      );

      if (response.data.erro === 'true') {
        throw new BadRequestException('Não foi encontrado um CEP');
      }

      const result = {
        postalCode: response.data.cep.replace('-', ''),
        neighborhood: response.data.bairro,
        street: response.data.logradouro,
        city: response.data.localidade,
      };

      return result;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Erro ao buscar CEP, tente outro CEP.');
    }
  }

  private async findOneAddress(postalCode: string) {
    return this.addressRepository.findOneAddress(postalCode);
  }

  async findAddress(postalCode: string): Promise<AddressResponse> {
    try {
      this.validateSearch(postalCode);

      const redisCep = await this.redisService.getAddress(postalCode);
      if (redisCep) return redisCep;

      const dbCep = await this.findOneAddress(postalCode);
      if (dbCep) {
        const result = {
          postalCode: dbCep.postalCode,
          neighborhood: dbCep.neighborhood,
          street: dbCep.street,
          city: dbCep.city,
        };
        await this.redisService.saveAddress(postalCode, result);
        return result;
      }

      const viacep = await this.findAddressFromApi(postalCode);
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
        throw new BadRequestException('Erro interno do servidor');
      }
    }
  }

  validateSearch(postalCode: string): void {
    if (postalCode.length !== 8) {
      throw new Error('CEP inválido. Um CEP válido contém 8 dígitos');
    }
    if (!/^\d{8}$/.test(postalCode)) {
      throw new Error(
        'CEP inválido. Um CEP válido contém apenas dígitos numéricos',
      );
    }
  }
}
