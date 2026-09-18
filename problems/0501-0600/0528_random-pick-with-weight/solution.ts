// Prefix sums lay the weights end to end over [0, total); one uniform
// draw lands in exactly one segment, so index i comes back with
// probability exactly weights[i] / total.
class Solution {
    private prefix: number[];

    constructor(weights: number[]) {
        this.prefix = [0];
        for (const weight of weights) {
            this.prefix.push(this.prefix[this.prefix.length - 1] + weight);
        }
    }

    pickIndex(): number {
        const total = this.prefix[this.prefix.length - 1];
        const target = 1 + Math.floor(Math.random() * total);
        let low = 1;
        let high = this.prefix.length - 1; // first index with prefix[i] >= target
        while (low < high) {
            const mid = (low + high) >> 1;
            if (this.prefix[mid] >= target) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return low - 1;
    }
}
