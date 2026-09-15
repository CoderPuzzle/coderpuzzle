function lexSmallest(s: string): string {
    const n = s.length;
    const t = [...s].reverse().join("");
    // Double rolling hashes over s and over its reverse: each candidate
    // glues at most two slices of these two strings, so any candidate
    // prefix hashes in O(1) from the tables below. reverse(s[:k]) is the
    // slice of the reversed string at offset n-k; reverse(s[n-k:]) sits
    // at offset 0.
    const M1 = 1000000007,
        M2 = 998244353,
        B1 = 131,
        B2 = 137;
    // Exact (a * b) % m for a, b below 2^31: split off the high bits so
    // every intermediate product stays inside double precision.
    const mul = (a: number, b: number, m: number): number => {
        const hi = Math.floor(a / 32768),
            lo = a - hi * 32768;
        return (((hi * b) % m) * 32768 + lo * b) % m;
    };
    const pw1: number[] = new Array(n + 1).fill(1),
        pw2: number[] = new Array(n + 1).fill(1);
    const hs1: number[] = new Array(n + 1).fill(0),
        hs2: number[] = new Array(n + 1).fill(0);
    const ht1: number[] = new Array(n + 1).fill(0),
        ht2: number[] = new Array(n + 1).fill(0);
    let g1 = 0,
        g2 = 0,
        u1 = 0,
        u2 = 0;
    for (let i = 0; i < n; i++) {
        const v = s.charCodeAt(i) - 96,
            w = t.charCodeAt(i) - 96;
        g1 = (mul(g1, B1, M1) + v) % M1;
        g2 = (mul(g2, B2, M2) + v) % M2;
        u1 = (mul(u1, B1, M1) + w) % M1;
        u2 = (mul(u2, B2, M2) + w) % M2;
        pw1[i + 1] = mul(pw1[i], B1, M1);
        pw2[i + 1] = mul(pw2[i], B2, M2);
        hs1[i + 1] = g1;
        hs2[i + 1] = g2;
        ht1[i + 1] = u1;
        ht2[i + 1] = u2;
    }
    const subS = (l: number, length: number): [number, number] => [
        (hs1[l + length] - mul(hs1[l], pw1[length], M1) + M1) % M1,
        (hs2[l + length] - mul(hs2[l], pw2[length], M2) + M2) % M2,
    ];
    const subT = (l: number, length: number): [number, number] => [
        (ht1[l + length] - mul(ht1[l], pw1[length], M1) + M1) % M1,
        (ht2[l + length] - mul(ht2[l], pw2[length], M2) + M2) % M2,
    ];
    // Hash pair of a candidate's first `length` characters: kind 0 is
    // reverse(s[:k]) + s[k:] (slices t[:k] then s[k:]), kind 1 is
    // s[:n-k] + reverse(s[n-k:]) (slices s[:head] then t[:head]).
    const pref = (kind: number, k: number, length: number): [number, number] => {
        if (kind === 0) {
            if (length <= k) {
                return subT(n - k, length);
            }
            const [a1, a2] = subT(n - k, k);
            const [c1, c2] = subS(k, length - k);
            return [(mul(a1, pw1[length - k], M1) + c1) % M1, (mul(a2, pw2[length - k], M2) + c2) % M2];
        }
        const head = n - k;
        if (length <= head) {
            return subS(0, length);
        }
        const [a1, a2] = subS(0, head);
        const [c1, c2] = subT(0, length - head);
        return [(mul(a1, pw1[length - head], M1) + c1) % M1, (mul(a2, pw2[length - head], M2) + c2) % M2];
    };
    const charAt = (kind: number, k: number, i: number): string => {
        // Kind 0 walks the reversed prefix backwards through s; past the
        // boundary both kinds continue with s at the same index.
        if (kind === 0) {
            return i < k ? s[k - 1 - i] : s[i];
        }
        const head = n - k;
        return i < head ? s[i] : t[i - head];
    };
    const probe = Math.min(n, 16);
    let bestKind = 0,
        bestK = -1;
    const beats = (kind: number, k: number): boolean => {
        // True when this candidate sorts strictly before the champion.
        // Exact probe first: most contenders differ within a few chars.
        for (let i = 0; i < probe; i++) {
            const a = charAt(kind, k, i),
                c = charAt(bestKind, bestK, i);
            if (a !== c) {
                return a < c;
            }
        }
        // Indistinguishable near the front: settle the rest by hashed
        // longest-common-prefix binary search (probe chars already tie).
        let lo = probe,
            hi = n;
        while (lo < hi) {
            const mid = (lo + hi + 1) >> 1;
            const [a1, a2] = pref(kind, k, mid);
            const [c1, c2] = pref(bestKind, bestK, mid);
            if (a1 === c1 && a2 === c2) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        if (lo === n) {
            return false;
        }
        return charAt(kind, k, lo) < charAt(bestKind, bestK, lo);
    };
    // Only candidates starting with the smallest letter can win.
    let smallest = s[0];
    for (const ch of s) {
        if (ch < smallest) {
            smallest = ch;
        }
    }
    for (let i = 0; i < n; i++) {
        if (s[i] === smallest && (bestK < 0 || beats(0, i + 1))) {
            bestKind = 0;
            bestK = i + 1;
        }
    }
    if (s[0] === smallest) {
        for (let k = 2; k <= n; k++) {
            if (beats(1, k)) {
                bestKind = 1;
                bestK = k;
            }
        }
    }
    // Materialize only the winning candidate.
    return bestKind === 0
        ? [...s.slice(0, bestK)].reverse().join("") + s.slice(bestK)
        : s.slice(0, n - bestK) + [...s.slice(n - bestK)].reverse().join("");
}
