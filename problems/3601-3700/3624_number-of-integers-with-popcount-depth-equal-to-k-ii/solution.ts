function popcountDepth(nums: number[], queries: number[][]): number[] {
    // Every popcount chain collapses to 1 in at most four steps for values
    // <= 10^15, so depths live in 0..4 (k may still ask for 5, whose tree
    // simply stays empty). Six Fenwick trees, one per depth class, each
    // marking the indices currently holding that depth: a query is a
    // prefix-difference on tree[k], an update is two point flips. Values
    // and counts stay below 2^53, so Number math is exact; popcount uses
    // halving because bitwise ops truncate to 32 bits.
    const n = nums.length;
    const trees: number[][] = [];
    for (let k = 0; k < 6; ++k) trees.push(new Array(n + 1).fill(0));
    const depth = (x: number): number => {
        let d = 0;
        while (x > 1) {
            let bits = 0;
            while (x > 0) {
                if (x % 2 === 1) ++bits;
                x = Math.floor(x / 2);
            }
            x = bits;
            ++d;
        }
        return d;
    };
    const add = (k: number, i: number, delta: number): void => {
        for (++i; i <= n; i += i & -i) trees[k][i] += delta;
    };
    const pref = (k: number, i: number): number => {
        let s = 0;
        for (; i > 0; i -= i & -i) s += trees[k][i];
        return s;
    };
    for (let i = 0; i < n; ++i) add(depth(nums[i]), i, 1);
    const answer: number[] = [];
    for (const q of queries) {
        if (q[0] === 1) {
            const k = q[3];
            answer.push(pref(k, q[2] + 1) - pref(k, q[1]));
        } else {
            const idx = q[1];
            add(depth(nums[idx]), idx, -1);
            nums[idx] = q[2];
            add(depth(nums[idx]), idx, 1);
        }
    }
    return answer;
}
