class ProductOfNumbers {
    private prefix: number[];

    constructor() {
        this.prefix = [1];
    }

    add(num: number): void {
        if (num === 0) {
            this.prefix = [1];
            return;
        }
        this.prefix.push(this.prefix[this.prefix.length - 1] * num);
    }

    getProduct(k: number): number {
        if (k >= this.prefix.length) {
            return 0;
        }
        return this.prefix[this.prefix.length - 1] / this.prefix[this.prefix.length - 1 - k];
    }
}
