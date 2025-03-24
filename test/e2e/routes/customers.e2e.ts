/* eslint-disable max-lines-per-function */
import { api } from '@tests/e2e/config/api';

describe('Customers routes', () => {
    describe('afterRead Customers', () => {
        it('should get all customers with @yahoo.com', async () => {
            const { data, status } = await api.get('/sales-order/Customers');
            const { value: customers } = data;
            expect(status).toBe(200);
            expect(customers.length).toBe(10);
            expect(customers).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: '15835090-bd46-4163-b935-59e5a2b9c1aa',
                        firstName: 'firstName-15835090',
                        lastName: 'lastName-15835090',
                        email: 'email-15835090@yahoo.com'
                    })
                ])
            );
        });
        it('should return at least one e-mail with @gmail.com', async () => {
            const { data, status } = await api.get('/sales-order/Customers');
            const { value: customers } = data;
            expect(status).toBe(200);
            expect(customers.length).toBe(10);
            expect(customers).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: '27831255-9abb-4c2f-80a8-287902446abb',
                        firstName: 'firstName1',
                        lastName: 'lastName-27831255',
                        email: 'email-27831255@gmail.com'
                    })
                ])
            );
        });
    });
});
