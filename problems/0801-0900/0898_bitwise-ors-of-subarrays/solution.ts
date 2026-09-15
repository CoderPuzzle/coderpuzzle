function subarrayBitwiseORs(arr: number[]): number {
    const seen = new Set<number>();
    // current: distinct OR values of subarrays ending at this index.
    let current = new Set<number>();
    for (const x of arr) {
        // Every subarray ending here is [x] alone or an old suffix OR
        // extended by x; OR never clears bits, so current stays small
        // (at most ~b+1 values for b-bit numbers).
        const nxt = new Set<number>();
        for (const y of current) {
            nxt.add(x | y);
        }
        nxt.add(x);
        current = nxt;
        for (const v of current) {
            seen.add(v);
        }
    }
    return seen.size;
}
