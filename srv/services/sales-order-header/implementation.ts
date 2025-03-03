import { SalesOrderHeader, SalesOrderItem } from "@models/sales";
import { SalesOrderHeaderService, CreationPayloadValidationResult } from "./protocols";
import { SalesOrderHeaderModel } from '../../models/sales-order-header';
import { SalesOrderItemModel } from '../../models/sales-order-item';
import { ProductRepository } from '../../repositories/product/protocols';
import { CustomerRepository } from "srv/repositories/customer/protocols";
import { ProductModel } from "srv/models/product";
import { CustomerModel } from "srv/models/customer";


export class SalesOrderHeaderServiceImpl implements SalesOrderHeaderService {
    constructor(
        private readonly customerRepository: CustomerRepository,
        private readonly productRepository: ProductRepository
    ) {}

    public async beforeCreate(params: SalesOrderHeader): Promise<CreationPayloadValidationResult> {
        const products = await this.getProductsByIds(params);
        if (!products) {
            return {
                hasError: true,
                error: new Error('Nenhum produto da lista de itens foi encontrado.')
            }
        }
        const items = this.getSalesOrderItems(params, products);
        const header = this.getSalesOrderHeader(params, items);
        const customer = await this.getCustomerById(params);
        if (!customer) {
            return {
                hasError: true,
                error: new Error('Customer não encontrado')
            }
        }
        const headerValidationResult = header.validateCreationPayload({ customer_id: customer.id });
        if (headerValidationResult.hasError) {
            return headerValidationResult;
        }
        
        return {
            hasError: false,
            totalAmount: header.calculateDiscount()
        }
    }

    private async getProductsByIds(params: SalesOrderHeader): Promise<ProductModel[] | null> {
        const productsIds: string[] = params.items?.map((item: SalesOrderItem) => item.product_id) as string[];
        return this.productRepository.findByIds(productsIds);
    }

    private getSalesOrderItems(params: SalesOrderHeader, products: ProductModel[]): SalesOrderItemModel[] {
        return params.items?.map(item => SalesOrderItemModel.create({
            price: item.price as number,
            productId: item.product_id as string,
            quantity: item.quantity as number,
            products
        })) as SalesOrderItemModel[];
    }

    private getSalesOrderHeader(params: SalesOrderHeader, items: SalesOrderItemModel[]): SalesOrderHeaderModel {
        return SalesOrderHeaderModel.create({
            customerId: params.customer_id as string,
            items
        });
    }

    private getCustomerById(params: SalesOrderHeader): Promise<CustomerModel | null> {
        const costumerId = params.customer_id as string;
        return this.customerRepository.findById(costumerId);
    }
}
