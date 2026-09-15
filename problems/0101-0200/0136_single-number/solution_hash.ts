function singleNumber(nums: number[]): number {
    // Parity hash set: the first sight of a value adds it, the second
    // removes it — a paired element erases its own trace, so the set holds
    // exactly the values seen an odd number of times.
    const seen = new Set<number>();
    for (const value of nums) {
        if (seen.has(value)) {
            seen.delete(value);
        } else {
            seen.add(value);
        }
    }
    // Fold the odd-count survivors with XOR: even-count values cancel in
    // any XOR fold anyway, so this equals folding the whole array.
    let result = 0;
    for (const value of seen) {
        result ^= value;
    }
    return result;
}
