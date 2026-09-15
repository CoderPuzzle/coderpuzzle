function longestDupSubstring(s: string): string {
    const n = s.length;
    const a: number[] = new Array(n);
    for (let i = 0; i < n; i++) a[i] = s.charCodeAt(i) - 97;
    const MOD1 = 1000000007;
    const MOD2 = 1000000009;
    const BASE = 26;

    // Precomputed base powers so each rolling-hash slide costs O(1).
    const pow1: number[] = new Array(n + 1).fill(1);
    const pow2: number[] = new Array(n + 1).fill(1);
    for (let i = 1; i <= n; i++) {
        pow1[i] = (pow1[i - 1] * BASE) % MOD1;
        pow2[i] = (pow2[i - 1] * BASE) % MOD2;
    }

    const mod = (x: number, m: number): number => ((x % m) + m) % m;

    // Returns a start index of some length-`length` duplicate, else -1.
    const check = (length: number): number => {
        if (length === 0) return -1;
        let h1 = 0,
            h2 = 0;
        for (let i = 0; i < length; i++) {
            h1 = (h1 * BASE + a[i]) % MOD1;
            h2 = (h2 * BASE + a[i]) % MOD2;
        }
        const seen = new Map<string, number[]>();
        seen.set(h1 + "," + h2, [0]);
        for (let i = 1; i + length <= n; i++) {
            // Roll: drop the leftmost character's contribution, append the
            // incoming one.
            h1 = mod(mod(h1 - a[i - 1] * pow1[length - 1], MOD1) * BASE + a[i + length - 1], MOD1);
            h2 = mod(mod(h2 - a[i - 1] * pow2[length - 1], MOD2) * BASE + a[i + length - 1], MOD2);
            // Two independent polynomial hashes form the key; a repeat is
            // still verified character by character so collisions can never
            // produce a wrong answer.
            const key = h1 + "," + h2;
            if (seen.has(key)) {
                const starts = seen.get(key)!;
                let matched = false;
                for (const st of starts) {
                    let eq = true;
                    for (let t = 0; t < length; t++) {
                        if (a[st + t] !== a[i + t]) {
                            eq = false;
                            break;
                        }
                    }
                    if (eq) {
                        matched = true;
                        break;
                    }
                }
                if (matched) return i;
                starts.push(i);
            } else {
                seen.set(key, [i]);
            }
        }
        return -1;
    };

    // Monotonicity: a duplicate of length L implies duplicates at every
    // shorter length, so feasible lengths form a prefix — binary search
    // the largest one.
    let lo = 1,
        hi = n;
    let bestLength = 0,
        bestStart = -1;
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        const idx = check(mid);
        if (idx !== -1) {
            bestLength = mid;
            bestStart = idx;
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }

    if (bestLength === 0) return "";
    return s.substring(bestStart, bestStart + bestLength);
}
