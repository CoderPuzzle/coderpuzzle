function countPairs(nums: number[]): number {
    // Splitting the two operations between the numbers never helps: the
    // minimum number of digit swaps turning one padded string into
    // another obeys the triangle inequality, so x and y are almost equal
    // exactly when y is reachable from x by <= 2 swaps of x's own
    // digits, compared with leading zeros padded to the longer length
    // (that is how 1023 becomes 0213 = 213 and 1 meets 100).
    //
    // Pad every number to the widest width w (<= 7), enumerate all
    // values reachable by 0, 1, or 2 swaps (at most 1 + C(w,2) +
    // C(w,2)^2 deduplicated states), and sweep left to right: add the
    // frequencies of already-seen numbers found in the reachable set,
    // then record the current number. Each pair is counted once, via
    // the later element querying the earlier one's actual value. All
    // intermediates stay far below 2^53, so Number arithmetic is exact.
    let widest = 0;
    for (const x of nums) widest = Math.max(widest, x);
    const w: number = String(widest).length;
    const pairs: number[][] = [];
    for (let i = 0; i < w; i++) for (let j = i + 1; j < w; j++) pairs.push([i, j]);
    const seen = new Map<number, number>();
    let ans = 0;
    for (const x of nums) {
        const s = String(x);
        const d: string[] = new Array(w).fill("0");
        for (let k = 0; k < s.length; k++) d[w - s.length + k] = s[k];
        const states = new Set<number>();
        const value = (): number => Number(d.join(""));
        states.add(value());
        for (const [i, j] of pairs) {
            [d[i], d[j]] = [d[j], d[i]];
            states.add(value());
            for (const [k, l] of pairs) {
                [d[k], d[l]] = [d[l], d[k]];
                states.add(value());
                [d[k], d[l]] = [d[l], d[k]];
            }
            [d[i], d[j]] = [d[j], d[i]];
        }
        for (const v of states) {
            const c = seen.get(v);
            if (c !== undefined) ans += c;
        }
        seen.set(x, (seen.get(x) || 0) + 1);
    }
    return ans;
}
