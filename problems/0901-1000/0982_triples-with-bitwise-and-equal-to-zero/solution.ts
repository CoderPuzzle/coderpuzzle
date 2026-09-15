// A triple's AND vanishes exactly when the first two values' AND is a submask
// of the third value's complement. One pass over all n^2 ordered pairs
// records f[v] = pairs with nums[i] & nums[j] == v, a subset zeta transform
// turns f into h[m] = sum of f over the submasks of m, and each k then
// contributes h[~nums[k] & 0xFFFF].
function countTriplets(nums: number[]): number {
    const full = 1 << 16;
    const f: number[] = new Array(full).fill(0);
    for (const x of nums) {
        for (const y of nums) {
            f[x & y]++;
        }
    }
    for (let b = 0; b < 16; ++b) {
        const bit = 1 << b;
        for (let mask = 0; mask < full; ++mask) {
            if (mask & bit) {
                f[mask] += f[mask ^ bit];
            }
        }
    }
    let answer = 0;
    for (const x of nums) {
        answer += f[~x & 0xffff];
    }
    return answer;
}
