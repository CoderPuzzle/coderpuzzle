function countBits(n: number): number[] {
    const ans: number[] = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        // value & (value - 1) clears the lowest set bit in one AND, so the
        // loop body runs exactly popcount(i) times — never once per bit
        // position.
        let count = 0;
        let value = i;
        while (value !== 0) {
            value = value & (value - 1);
            count++;
        }
        ans[i] = count;
    }
    return ans;
}
