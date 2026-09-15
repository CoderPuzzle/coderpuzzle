function maxProduct(nums: number[], k: number, limit: number): number {
    // Per (parity, sum) we keep every reachable product <= limit, not just
    // the maximum: a larger product can blow past limit on a later multiply
    // while a smaller one survives. Product-0 reachability is tracked
    // separately, since a 0 can only be reached through a subsequence
    // containing a zero, even via products above the limit.
    const total = nums.reduce((a, b) => a + b, 0);
    if (Math.abs(k) > total) return -1;
    const width = 2 * total + 1;
    let products: Set<number>[][] = [
        Array.from({ length: width }, () => new Set<number>()),
        Array.from({ length: width }, () => new Set<number>()),
    ];
    let zero = [new Array<boolean>(width).fill(false), new Array<boolean>(width).fill(false)];
    let reach = [new Array<boolean>(width).fill(false), new Array<boolean>(width).fill(false)];
    for (const x of nums) {
        // Skipping x keeps every current state.
        const np = [products[0].map((s) => new Set(s)), products[1].map((s) => new Set(s))];
        const nz = [zero[0].slice(), zero[1].slice()];
        const nr = [reach[0].slice(), reach[1].slice()];
        for (let p = 0; p < 2; p++) {
            const sign = p === 0 ? 1 : -1;
            const q = 1 - p;
            for (let i = 0; i < width; i++) {
                const s = i - total;
                const ns = s + sign * x;
                if (ns < -total || ns > total) continue;
                const j = ns + total;
                if (reach[p][i]) {
                    nr[q][j] = true;
                    if (x === 0) {
                        nz[q][i] = true;
                    } else {
                        for (const prod of products[p][i]) {
                            const newp = prod * x;
                            if (newp <= limit) np[q][j].add(newp);
                        }
                    }
                }
                if (zero[p][i]) {
                    nz[q][j] = true;
                }
            }
        }
        // A fresh subsequence with x as its single (even-index) element.
        if (x === 0) {
            nz[1][total] = true;
            nr[1][total] = true;
        } else {
            nr[1][x + total] = true;
            if (x <= limit) np[1][x + total].add(x);
        }
        products = np;
        zero = nz;
        reach = nr;
    }
    let ans = -1;
    const idx = k + total;
    if (idx >= 0 && idx < width) {
        for (let p = 0; p < 2; p++) {
            for (const prod of products[p][idx]) {
                if (prod > ans) ans = prod;
            }
            if (zero[p][idx] && ans < 0) ans = 0;
        }
    }
    return ans;
}
