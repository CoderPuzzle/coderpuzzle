// A beautiful substring has equal vowels and consonants (the prefix
// vowel-minus-consonant balance is equal at both ends) and with both
// counts equal to x, x*x % k == 0 holds exactly when x is a multiple
// of m, the least x >= 1 with x*x % k == 0 — for k = p1^a1 * p2^a2 *
// ... that is the product of p^ceil(a/2). So a substring counts iff
// its end balances match and its length is a multiple of 2m, i.e.
// both end indices agree modulo 2m. One pass counts earlier prefixes
// with the same (balance, index mod 2m) key, encoded as one number
// (at most ~4*10^8, exact in Number).
function beautifulSubstrings(s: string, k: number): number {
    let m = 1;
    let rest = k;
    for (let p = 2; p * p <= rest; p++) {
        if (rest % p === 0) {
            let a = 0;
            while (rest % p === 0) {
                rest = Math.floor(rest / p);
                a++;
            }
            for (let t = 0; t < (a + 1) >> 1; t++) m *= p;
        }
    }
    if (rest > 1) m *= rest;
    const period = 2 * m;
    const n = s.length;
    const seen = new Map<number, number>();
    seen.set(n * period, 1); // empty prefix: balance 0, index 0
    let total = 0;
    let balance = 0;
    for (let i = 1; i <= n; i++) {
        balance += "aeiou".includes(s[i - 1]) ? 1 : -1;
        const key = (balance + n) * period + (i % period);
        const slot = seen.get(key) ?? 0;
        total += slot;
        seen.set(key, slot + 1);
    }
    return total;
}
