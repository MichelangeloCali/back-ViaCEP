import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from './entities/address.entity';

type viaCepResponseType = {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
};
@Injectable()
export class AddressService {
  constructor(private readonly httpService: HttpService) {}

  async createAddress(createAddressDto: CreateAddressDto) {
    console.log(createAddressDto);
    return 'This action adds a new address';
  }

  async findAddress(cep: string): Promise<Omit<Address, 'id'>> {
    return this.findAddressFromApi(cep);
  }

  async findAddressFromApi(cep: string): Promise<Omit<Address, 'id'>> {
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
      throw new Error('Erro ao obter endereço do CEP');
    }
  }

  async findOneAddress(id: number) {
    return `This action returns a #${id} address`;
  }
}
