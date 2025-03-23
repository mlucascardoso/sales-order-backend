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
        firstName: 'Josh',
        lastName: 'Johnson',
        email: ''
    }
];

const getCustomersWithFullEmail = (): Customers => [
    {
        id,
        firstName: 'Cuka',
        lastName: 'Cardoso',
        email: 'lucasbtp2@gmail.com'
    }
];

const getCustomersWithEmailWithoutAt = (): Customers => [
    {
        id,
        firstName: 'Joaozinho',
        lastName: 'San',
        email: 'joaozinho'
    }
];

describe('CustomerServiceImpl test cases', () => {
    it('should test if afterRead works even if the e-mail is undefined', () => {
        const { sut } = makeSut();
        const customers = getCustomersWithoutEmail();
        const result = sut.afterRead(customers);
        const expectedResult = [{ id, firstName: 'Josh', lastName: 'Johnson', email: '' }];
        expect(result).toEqual(expectedResult);
    });
    it('should test if afterRead does not changes the e-mail if a full e-mail is provided', () => {
        const { sut } = makeSut();
        const customers = getCustomersWithFullEmail();
        const result = sut.afterRead(customers);
        const expectedResult: Customers = [
            { id, firstName: 'Cuka', lastName: 'Cardoso', email: 'lucasbtp2@gmail.com' }
        ];
        expect(result).toEqual(expectedResult);
    });
    it('should test if after read changes the e-mail if an e-mail without at is provided', () => {
        const { sut } = makeSut();
        const customers = getCustomersWithEmailWithoutAt();
        const result = sut.afterRead(customers);
        const expectedResult: Customers = [
            { id, firstName: 'Joaozinho', lastName: 'San', email: 'joaozinho@yahoo.com' }
        ];
        expect(result).toEqual(expectedResult);
    });
});
