function sumScores(s: string): number {
    const n = s.length;
    if (n === 0) return 0;
    const a: number[] = new Array(n);
    for (let i = 0; i < n; i++) a[i] = s.charCodeAt(i) - 97;
    const MOD1 = 1000000007;
    const MOD2 = 1000000009;
    const BASE = 26;

    // Prefix hashes under two independent moduli plus base powers, so any
    // question "does the suffix at i agree with the prefix for L chars?" is
    // answered from three table reads.
    const pow1: number[] = new Array(n + 1).fill(1);
    const pow2: number[] = new Array(n + 1).fill(1);
    const pre1: number[] = new Array(n + 1).fill(0);
    const pre2: number[] = new Array(n + 1).fill(0);
    for (let j = 0; j < n; j++) {
        pow1[j + 1] = (pow1[j] * BASE) % MOD1;
        pow2[j + 1] = (pow2[j] * BASE) % MOD2;
        pre1[j + 1] = (pre1[j] * BASE + a[j]) % MOD1;
        pre2[j + 1] = (pre2[j] * BASE + a[j]) % MOD2;
    }

    const mod = (x: number, m: number): number => ((x % m) + m) % m;
    // Operands stay below 2^30; splitting the left one into 16-bit halves
    // keeps every intermediate product below 2^53, where double arithmetic
    // is exact.
    const mulmod = (x: number, y: number, m: number): number => {
        const xHi = Math.floor(x / 65536);
        const xLo = x % 65536;
        return (((((xHi * y) % m) * 65536) % m) + ((xLo * y) % m)) % m;
    };

    // The prefix's own hash is pre[L]; the suffix-at-i window's hash is
    // pre[i+L] - pre[i] * BASE^L, normalized. Agreement under both moduli
    // accepts the length; a coincidental double match is a collision, roughly
    // one chance in 10^18 per probe.
    const agrees = (i: number, l: number): boolean => {
        const h1 = mod(pre1[i + l] - mulmod(pre1[i], pow1[l], MOD1), MOD1);
        const h2 = mod(pre2[i + l] - mulmod(pre2[i], pow2[l], MOD2), MOD2);
        return h1 === pre1[l] && h2 === pre2[l];
    };

    // Agreement for L characters implies agreement at every shorter length,
    // so the predicate is prefix-monotone: binary-search each suffix's
    // longest common prefix with s. s itself scores n.
    let total = n;
    for (let i = 1; i < n; i++) {
        let lo = 0,
            hi = n - i;
        while (lo < hi) {
            const mid = Math.floor((lo + hi + 1) / 2);
            if (agrees(i, mid)) lo = mid;
            else hi = mid - 1;
        }
        total += lo;
    }
    return total;
}
