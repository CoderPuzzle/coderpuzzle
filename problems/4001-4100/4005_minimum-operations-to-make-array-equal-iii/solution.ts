function minOperations(nums: number[]): number {
    const n = nums.length;
    // Value -> multiplicity; already uniform (covers n = 1 and the
    // all-ones array) means nothing has to move.
    const freq = new Map<number, number>();
    for (const v of nums) freq.set(v, (freq.get(v) ?? 0) + 1);
    if (freq.size === 1) return 0;

    // Sieve once to sqrt(1e9); every value factors through these primes.
    const LIMIT = 31623;
    const composite = new Uint8Array(LIMIT + 1);
    const primes: number[] = [];
    for (let i = 2; i <= LIMIT; ++i) {
        if (!composite[i]) {
            primes.push(i);
            for (let j = i * i; j <= LIMIT; j += i) composite[j] = 1;
        }
    }

    const factorize = (value: number): Array<[number, number]> => {
        let v = value;
        const fac: Array<[number, number]> = [];
        for (const p of primes) {
            if (p * p > v) break;
            if (v % p === 0) {
                let e = 0;
                while (v % p === 0) {
                    v = Math.floor(v / p);
                    ++e;
                }
                fac.push([p, e]);
            }
        }
        if (v > 1) fac.push([v, 1]);
        return fac;
    };
    const divisors = (fac: Array<[number, number]>): number[] => {
        const ds = [1];
        for (const [p, e] of fac) {
            const size = ds.length;
            let power = 1;
            for (let t = 0; t < e; ++t) {
                power *= p;
                for (let i = 0; i < size; ++i) ds.push(ds[i] * power);
            }
        }
        return ds;
    };

    const facs = new Map<number, Array<[number, number]>>();
    for (const v of freq.keys()) facs.set(v, factorize(v));

    // multipleCount[d] = number of elements divisible by d, folded by
    // frequency over every distinct value's divisor set.
    const multipleCount = new Map<number, number>();
    for (const [v, f] of freq)
        for (const d of divisors(facs.get(v)!)) multipleCount.set(d, (multipleCount.get(d) ?? 0) + f);

    // A target absent from nums costs at least one operation per element
    // (>= n total), while the lcm costs at most n (every element divides
    // it in one op), so the optimum sits at a present value > 1 or at the
    // lcm itself. Track the lcm only until it outgrows any element.
    let lcm = 1;
    let capped = false;
    for (const v of freq.keys()) {
        lcm = (lcm / gcd(lcm, v)) * v;
        if (lcm > 1000000000) {
            capped = true;
            break;
        }
    }
    const lcmFreq = capped ? undefined : freq.get(lcm);
    let best = lcmFreq === undefined ? n : n - lcmFreq;

    // For a target x > 1 an element equal to x pays 0, one dividing x or
    // divisible by x pays 1, anything else pays 2 (multiply by x, then
    // divide by v). Both comparable sets contain the equals, so folding
    // them in full gives cost = 2n - dd - dv with no double charge.
    for (const [x, f] of freq) {
        if (x === 1) continue;
        let dd = 0;
        for (const d of divisors(facs.get(x)!)) dd += freq.get(d) ?? 0;
        best = Math.min(best, 2 * n - dd - multipleCount.get(x)!);
    }
    return best;
}

function gcd(a: number, b: number): number {
    while (b !== 0) {
        const t = a % b;
        a = b;
        b = t;
    }
    return a;
}
