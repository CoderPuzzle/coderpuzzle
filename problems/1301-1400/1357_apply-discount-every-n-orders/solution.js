/**
 * @param {number} n
 * @param {number} discount
 * @param {number[]} products
 * @param {number[]} prices
 */
class Cashier {
    // A product-to-price map plus a served-customer counter; every n-th
    // customer pays bill * (100 - discount) / 100.
    constructor(n, discount, products, prices) {
        this.n = n;
        this.discount = discount;
        this.prices = new Map();
        products.forEach((id, index) => this.prices.set(id, prices[index]));
        this.customers = 0;
    }

    /**
     * @param {number[]} product
     * @param {number[]} amount
     * @return {number}
     */
    getBill(product, amount) {
        let bill = 0;
        for (let j = 0; j < product.length; ++j) {
            bill += this.prices.get(product[j]) * amount[j];
        }
        this.customers += 1;
        if (this.customers % this.n === 0) {
            return (bill * (100 - this.discount)) / 100;
        }
        return bill;
    }
}
