function countBits(n: number): number[] {
    const ans: number[] = new Array(n + 1).fill(0);
    // i & (i - 1) clears i's lowest set bit, so its popcount is already
    // computed; the +1 adds the cleared bit back. Since i & (i - 1) < i for
    // every i >= 1, ascending order keeps the needed value ready.
    for (let i = 1; i <= n; i++) {
        ans[i] = ans[i & (i - 1)] + 1;
    }
    return ans;
}
