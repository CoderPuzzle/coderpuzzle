class Solution {
    private rects: number[][];
    private prefix: number[];

    // Prefix sums over rectangle areas (integer cells, (xi-ai+1)*(yi-bi+1))
    // select a rectangle with probability proportional to its area; a
    // uniform cell offset inside it yields the point — so every covered
    // integer point is exactly equally likely.
    constructor(rects: number[][]) {
        this.rects = rects;
        this.prefix = [0];
        for (const [ai, bi, xi, yi] of rects) {
            this.prefix.push(this.prefix[this.prefix.length - 1] + (xi - ai + 1) * (yi - bi + 1));
        }
    }

    pick(): number[] {
        const total = this.prefix[this.prefix.length - 1];
        const cell = Math.floor(Math.random() * total);
        // First rectangle whose cumulative area exceeds the drawn cell.
        let low = 1;
        let high = this.prefix.length - 1;
        while (low < high) {
            const mid = (low + high) >>> 1;
            if (this.prefix[mid] > cell) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        const [ai, bi, xi] = this.rects[low - 1];
        const width = xi - ai + 1;
        const offset = cell - this.prefix[low - 1];
        return [ai + (offset % width), bi + Math.floor(offset / width)];
    }
}
