function countKSubsequencesWithMaxBeauty(s: string, k: number): number {
    // Residues sit just under 1e9, so their products pass Number's 2^53
    // integer-precision limit; the accumulated arithmetic runs on BigInt
    // instead. Everything counted (frequency table, group sizes) is far
    // below it and stays Number-exact.
    const BMOD = 1000000007n;

    // f(c) per letter; letters absent from s drop out of the pool.
    const freq: number[] = new Array(26).fill(0);
    for (const ch of s) {
        freq[ch.charCodeAt(0) - 97]++;
    }
    const counts: number[] = freq.filter((f) => f > 0).sort((a, b) => b - a);
    // Fewer than k distinct characters: no k-subsequence exists at all.
    if (k > counts.length) {
        return 0;
    }

    // Exact: groups hold at most the 26 letters, so n <= 26 and the running
    // value never exceeds C(26, 13) = 10400600.
    const comb = (n: number, r: number): number => {
        r = Math.min(r, n - r);
        let out = 1;
        for (let t = 1; t <= r; ++t) {
            out = (out * (n - r + t)) / t;
        }
        return out;
    };
    const powMod = (baseBig: bigint, e: number): bigint => {
        let out = 1n;
        while (e > 0) {
            if (e & 1) {
                out = (out * baseBig) % BMOD;
            }
            baseBig = (baseBig * baseBig) % BMOD;
            e >>= 1;
        }
        return out;
    };

    // The maximum beauty takes the top-k frequencies. Whole equal-count
    // groups are consumed until one group gets split; the split choice
    // contributes C(group, take) letter sets, and each chosen letter
    // multiplies the index choices by its frequency, i.e. x^take for the
    // whole group.
    let ans = 1n;
    let rem = k;
    let i = 0;
    while (rem > 0) {
        let j = i;
        while (j < counts.length && counts[j] === counts[i]) {
            j++;
        }
        const take = Math.min(rem, j - i);
        ans = (ans * BigInt(comb(j - i, take))) % BMOD;
        ans = (ans * powMod(BigInt(counts[i]), take)) % BMOD;
        rem -= take;
        i = j;
    }
    return Number(ans);
}
