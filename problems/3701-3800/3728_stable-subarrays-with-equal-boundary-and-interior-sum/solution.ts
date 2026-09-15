function countStableSubarrays(capacity: number[]): number {
    const n = capacity.length;
    // Prefix sums reach n * 10^9 = 10^14, safely inside the 2^53 exact
    // range, so plain numbers accumulate them exactly.
    const prefix: number[] = new Array(n);
    prefix[0] = capacity[0];
    for (let i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] + capacity[i];
    }
    // With p the inclusive prefix sums, [l, r] is stable exactly when
    // (capacity[l], p[l]) equals (capacity[r], p[r - 1] - capacity[r]):
    // equal boundary values, and an interior sum that reduces to plain
    // prefix equality. The joined string is the pair's map key.
    const seen = new Map<string, number>();
    let count = 0;
    for (let r = 2; r < n; r++) {
        const left = r - 2;
        const leftKey = `${capacity[left]},${prefix[left]}`;
        seen.set(leftKey, (seen.get(leftKey) || 0) + 1);
        const key = `${capacity[r]},${prefix[r - 1] - capacity[r]}`;
        count += seen.get(key) || 0;
    }
    return count;
}
