function maxProduct(s: string): number {
    const n = s.length;
    const a: number[] = new Array(n);
    for (let i = 0; i < n; i++) a[i] = s.charCodeAt(i) - 97;
    const MOD1 = 1000000007;
    const MOD2 = 1000000009;
    const BASE = 26;

    // Precomputed base powers plus forward and reversed prefix hashes, so
    // any substring palindrome test costs O(1).
    const pow1: number[] = new Array(n + 1).fill(1);
    const pow2: number[] = new Array(n + 1).fill(1);
    const pre1: number[] = new Array(n + 1).fill(0);
    const pre2: number[] = new Array(n + 1).fill(0);
    const rpre1: number[] = new Array(n + 1).fill(0);
    const rpre2: number[] = new Array(n + 1).fill(0);
    for (let j = 0; j < n; j++) {
        pow1[j + 1] = (pow1[j] * BASE) % MOD1;
        pow2[j + 1] = (pow2[j] * BASE) % MOD2;
        pre1[j + 1] = (pre1[j] * BASE + a[j]) % MOD1;
        pre2[j + 1] = (pre2[j] * BASE + a[j]) % MOD2;
        rpre1[j + 1] = (rpre1[j] * BASE + a[n - 1 - j]) % MOD1;
        rpre2[j + 1] = (rpre2[j] * BASE + a[n - 1 - j]) % MOD2;
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

    // s[l..r] is a palindrome iff its forward hash equals the forward hash
    // of the mirrored window in the reversed string; two independent
    // moduli make a false match vanishingly unlikely.
    const isPal = (l: number, r: number): boolean => {
        const length = r - l + 1;
        const f1 = mod(pre1[r + 1] - mulmod(pre1[l], pow1[length], MOD1), MOD1);
        const g1 = mod(rpre1[n - l] - mulmod(rpre1[n - 1 - r], pow1[length], MOD1), MOD1);
        const f2 = mod(pre2[r + 1] - mulmod(pre2[l], pow2[length], MOD2), MOD2);
        const g2 = mod(rpre2[n - l] - mulmod(rpre2[n - 1 - r], pow2[length], MOD2), MOD2);
        return f1 === g1 && f2 === g2;
    };

    // A palindrome of radius k around c implies one at every smaller
    // radius, so the predicate is monotone: binary-search each center's
    // maximal reach.
    const d1: number[] = new Array(n).fill(0);
    for (let c = 0; c < n; c++) {
        let lo = 0;
        let hi = Math.min(c, n - 1 - c);
        while (lo < hi) {
            const mid = Math.floor((lo + hi + 1) / 2);
            if (isPal(c - mid, c + mid)) lo = mid;
            else hi = mid - 1;
        }
        d1[c] = lo + 1;
    }

    // Record, per center, the longest odd palindrome that ends exactly
    // at each index and the longest that starts exactly at each index.
    const bestEnd: number[] = new Array(n).fill(0);
    const bestStart: number[] = new Array(n).fill(0);
    for (let c = 0; c < n; c++) {
        const length = 2 * d1[c] - 1;
        const end = c + d1[c] - 1;
        const start = c - d1[c] + 1;
        if (length > bestEnd[end]) bestEnd[end] = length;
        if (length > bestStart[start]) bestStart[start] = length;
    }

    // Shrink from the recorded maximum: a palindrome ending at i+1 of length L
    // implies one ending at i of length L-2 (drop one char from each side).
    for (let i = n - 2; i >= 0; i--) {
        const candEnd = bestEnd[i + 1] - 2;
        if (candEnd > bestEnd[i]) bestEnd[i] = candEnd;
    }
    for (let i = 1; i < n; i++) {
        const candStart = bestStart[i - 1] - 2;
        if (candStart > bestStart[i]) bestStart[i] = candStart;
    }

    // Prefix max of bestEnd / suffix max of bestStart = the longest
    // palindrome fully inside each prefix / suffix.
    const pref: number[] = new Array(n).fill(0);
    pref[0] = bestEnd[0];
    for (let i = 1; i < n; i++) {
        pref[i] = Math.max(pref[i - 1], bestEnd[i]);
    }

    const suff: number[] = new Array(n).fill(0);
    suff[n - 1] = bestStart[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        suff[i] = Math.max(suff[i + 1], bestStart[i]);
    }

    // The two palindromes are disjoint, so some split separates them;
    // try every split. Single characters are length-1 palindromes, so
    // both sides always contribute at least 1.
    let ans = 0;
    for (let i = 0; i < n - 1; i++) {
        const candidate = pref[i] * suff[i + 1];
        if (candidate > ans) ans = candidate;
    }
    return ans;
}
