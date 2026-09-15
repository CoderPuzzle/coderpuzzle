function maximumSum(nums: number[]): number {
    // Group values by remainder mod 3 and keep the three largest of each
    // group -- no valid triplet ever needs a group's fourth-largest value.
    // The only remainder patterns summing to 0 mod 3 are 000, 111, 222,
    // and 012, so at most nine values decide everything; the answer is at
    // most 3 * 10^5, safely inside 32 bits. If no pattern is achievable
    // the answer stays 0.
    const top: number[][] = [[], [], []];
    for (const v of nums) {
        top[v % 3].push(v);
    }
    for (const group of top) {
        group.sort((a, b) => b - a);
        group.length = Math.min(group.length, 3);
    }
    const take = (r: number, k: number): number => {
        const group = top[r];
        if (group.length < k) return -1;
        let total = 0;
        for (let i = 0; i < k; i++) total += group[i];
        return total;
    };
    let best = 0;
    for (const r of [0, 1, 2]) {
        const total = take(r, 3);
        if (total > best) best = total;
    }
    const [a, b, c] = [take(0, 1), take(1, 1), take(2, 1)];
    if (a >= 0 && b >= 0 && c >= 0 && a + b + c > best) {
        best = a + b + c;
    }
    return best;
}
