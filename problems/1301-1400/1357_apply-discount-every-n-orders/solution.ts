class Cashier {
    // A product-to-price map plus a served-customer counter; every n-th
    // customer pays bill * (100 - discount) / 100.
    private n: number;
    private discount: number;
    private prices = new Map<number, number>();
    private customers = 0;

    constructor(n: number, discount: number, products: number[], prices: number[]) {
        this.n = n;
        this.discount = discount;
        products.forEach((id, index) => this.prices.set(id, prices[index]));
    }

    getBill(product: number[], amount: number[]): number {
        let bill = 0;
        for (let j = 0; j < product.length; ++j) {
            bill += this.prices.get(product[j])! * amount[j];
        }
        this.customers += 1;
        if (this.customers % this.n === 0) {
            return (bill * (100 - this.discount)) / 100;
        }
        return bill;
    }
}
