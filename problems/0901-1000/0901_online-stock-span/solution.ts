class StockSpanner {
    private stack: [number, number][];

    constructor() {
        this.stack = [];
    }

    next(price: number): number {
        let span = 1;
        while (this.stack.length > 0 && this.stack[this.stack.length - 1][0] <= price) {
            span += this.stack.pop()![1];
        }
        this.stack.push([price, span]);
        return span;
    }
}
