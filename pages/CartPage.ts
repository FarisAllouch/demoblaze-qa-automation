import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { FormHelper } from '../helpers/FormHelper';

export class CartPage extends BasePage {
    readonly deleteButton: Locator;
    readonly placeOrderButton: Locator;

    readonly productList: Locator;
    readonly totalProducts: Locator;

    readonly orderModal: Locator;
    readonly closeOrderModalx: Locator;
    readonly closeOrderModalbutton: Locator;

    readonly nameField: Locator;
    readonly countryField: Locator;
    readonly cityField: Locator;
    readonly cardField: Locator;
    readonly monthField: Locator;
    readonly yearField: Locator;

    readonly purchaseButton: Locator;

    constructor(page: Page){
        super(page);

        this.deleteButton = page.locator('a', { hasText: 'Delete' });
        this.placeOrderButton = page.getByRole('button',{name:'Place Order'});

        this.productList = page.locator('tbody tr');
        this.totalProducts = page.locator('#totalp');

        this.orderModal = page.locator('#orderModal .modal-content');
        this.closeOrderModalx = page.locator('#orderModal .modal-header button');
        this.closeOrderModalbutton = page.locator('#orderModal .modal-footer button').first();

        this.nameField = page.locator('#name');
        this.countryField = page.locator('#country');
        this.cityField = page.locator('#city');
        this.cardField = page.locator('#card');
        this.monthField = page.locator('#month');
        this.yearField = page.locator('#year');


        this.purchaseButton = page.getByRole('button',{name:'Purchase'});
    }

    async deleteProduct(productName: string, index: number = 0) {
        const products = this.page.locator('tr.success')
            .filter({ hasText: productName })
            .nth(index);

        await this.clickElement(
            products.locator(this.deleteButton)
        );
    }

    async openOrderModal() {
        await this.clickElement(this.placeOrderButton);
    }

    async placeOrder(data:{
        name: string,
        country: string,
        city: string,
        card: string,
        month: string,
        year: string
    }

    ) {

        await this.openOrderModal();

        await FormHelper.fillFields([
            {
                locator: this.nameField,
                value: data.name
            },
            {
                locator: this.countryField,
                value: data.country
            },
            {
                locator: this.cityField,
                value: data.city
            },
            {
                locator: this.cardField,
                value: data.card
            },
            {
                locator: this.monthField,
                value: data.month
            },
            {
                locator: this.yearField,
                value: data.year
            }
        ]);

        await this.clickElement(this.purchaseButton);
    }

    async closeOrderModalX() {
        await this.clickElement(this.closeOrderModalx);
    }

    async closeOrderModalButton() {
        await this.clickElement(this.closeOrderModalbutton);
    }
}