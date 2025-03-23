/* eslint-disable max-lines-per-function */
import { describe, expect, it } from 'vitest';

import { Customers } from '@models/sales';

import { CustomerService, CustomerServiceImpl } from '@/services/customer';

type SutTypes = {
    sut: CustomerService;
};

const makeSut = (): SutTypes => {
    return {
        sut: new CustomerServiceImpl()
    };
};

const id = crypto.randomUUID();

const getCustomersWithoutEmail = (): Customers => [
    {
        id,
        firstName: 'Cuka',
        lastName: 'Cardoso',
        email: ''
    }
];

const getCustomersWithFullEmail = (): Customers => [
    {
        id,
        firstName: 'Lucas',
        lastName: 'BTP',
        email: 'lucasbtp2@gmail.com'
    }
];

const getCustomersWithEmailWithoutAt = (): Customers => [
    {
        id,
        firstName: 'Joaozinho',
        lastName: 'Silva',
        email: 'joaozinhosilva'
    }
];

describe('CustomerServiceImpl test cases', () => {
    it('should test if afterRead works even if the customers array is empty', () => {
        const { sut } = makeSut();
        const customers = [];
        const result = sut.afterRead(customers);
        const expectedResult = [];
        expect(result.value).toEqual(expectedResult);
    });
    it('should test if afterRead works even if the e-mail is undefined or empty', () => {
        const { sut } = makeSut();
        const customers = getCustomersWithoutEmail();
        const expectedResult: Customers = [{ id, firstName: 'Cuka', lastName: 'Cardoso', email: '' }];
        const result = sut.afterRead(customers);
        expect(result.value).toEqual(expectedResult);
    });
    it('should test if afterRead does not changes the e-mail if a full e-mail is provided', () => {
        const { sut } = makeSut();
        const customers = getCustomersWithFullEmail();
        const expectedResult: Customers = [{ id, firstName: 'Lucas', lastName: 'BTP', email: 'lucasbtp2@gmail.com' }];
        const result = sut.afterRead(customers);
        expect(result.value).toEqual(expectedResult);
    });
    it('should test if afterRead changes the e-mail if an e-mail without at is provided', () => {
        const { sut } = makeSut();
        const customers = getCustomersWithEmailWithoutAt();
        const expectedResult: Customers = [
            { id, firstName: 'Joaozinho', lastName: 'Silva', email: 'joaozinhosilva@yahoo.com' }
        ];
        const result = sut.afterRead(customers);
        expect(result.value).toEqual(expectedResult);
    });
});
