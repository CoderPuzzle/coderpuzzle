class ProductOfNumbers {
    constructor() {
        this.prefix = [1];
    }

    add(num) {
        if (num === 0) {
            this.prefix = [1];
            return;
        }
        this.prefix.push(this.prefix[this.prefix.length - 1] * num);
    }

    getProduct(k) {
        if (k >= this.prefix.length) {
            return 0;
        }
        return this.prefix[this.prefix.length - 1] / this.prefix[this.prefix.length - 1 - k];
    }
}
