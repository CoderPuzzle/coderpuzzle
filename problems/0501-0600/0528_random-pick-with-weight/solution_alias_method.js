// Walker alias table: n columns of height total, index i's own material
// filling weights[i] * n of its column and a donor's topping up the rest;
// one uniform cell of the n * total grid lands on index i's material with
// probability exactly weights[i] / total.
class Solution {
    constructor(weights) {
        const n = weights.length;
        let total = 0;
        for (const weight of weights) {
            total += weight;
        }
        this.columns = n;
        this.total = total;
        this.height = weights.map((weight) => weight * n);
        this.alias = new Array(n).fill(0);
        const small = [];
        const large = [];
        for (let c = 0; c < n; c++) {
            if (this.height[c] < total) {
                small.push(c);
            } else {
                large.push(c);
            }
        }
        while (small.length > 0 && large.length > 0) {
            const under = small.pop();
            const over = large.pop();
            this.alias[under] = over;
            this.height[over] -= total - this.height[under];
            if (this.height[over] < total) {
                small.push(over);
            } else if (this.height[over] > total) {
                large.push(over);
            }
        }
    }

    pickIndex() {
        const cell = Math.floor(Math.random() * (this.columns * this.total));
        const column = cell % this.columns;
        const level = Math.floor(cell / this.columns);
        return level < this.height[column] ? column : this.alias[column];
    }
}
