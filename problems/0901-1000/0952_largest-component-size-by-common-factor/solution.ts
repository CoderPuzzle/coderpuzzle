// Two values land in one component exactly when a chain of shared prime
// factors links them: sharing a factor greater than 1 means sharing a
// prime, and every path in the graph alternates values with the primes
// they share. A smallest-prime-factor sieve up to the largest value
// factorizes each number in a handful of divisions, a union-find keyed by
// factor unions every value with each of its primes, and the largest class
// counted over the values is the answer — the value 1, having no prime
// factor, stays a singleton.
function largestComponentSize(nums: number[]): number {
    let m = 0;
    for (const v of nums) if (v > m) m = v;

    const spf: number[] = new Array(m + 1);
    for (let i = 0; i <= m; i++) spf[i] = i;
    for (let i = 2; i * i <= m; i++) {
        if (spf[i] === i) {
            for (let j = i * i; j <= m; j += i) {
                if (spf[j] === j) spf[j] = i;
            }
        }
    }

    const parent: number[] = new Array(m + 1);
    for (let i = 0; i <= m; i++) parent[i] = i;
    const size: number[] = new Array(m + 1).fill(1);

    const find = (x: number): number => {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    };
    const union = (a: number, b: number): void => {
        let ra = find(a),
            rb = find(b);
        if (ra === rb) return;
        if (size[ra] < size[rb]) {
            const t = ra;
            ra = rb;
            rb = t;
        }
        parent[rb] = ra;
        size[ra] += size[rb];
    };

    for (const v of nums) {
        let x = v;
        while (x > 1) {
            const p = spf[x];
            union(v, p);
            while (x % p === 0) x /= p;
        }
    }

    const counts = new Map<number, number>();
    let best = 0;
    for (const v of nums) {
        const r = find(v);
        const c = (counts.get(r) || 0) + 1;
        counts.set(r, c);
        if (c > best) best = c;
    }
    return best;
}
