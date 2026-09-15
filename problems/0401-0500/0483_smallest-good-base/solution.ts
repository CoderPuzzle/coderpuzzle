// BigInt, not number: the input reaches 10^18, past the 2^53 mark where
// a JS number stops representing integers exactly.
function smallestGoodBase(n: string): string {
    const value = BigInt(n);
    // An all-ones representation is a geometric sum 1 + k + ... + k^m.
    // Scan lengths longest-first: at a fixed total, more terms force
    // every term - the base included - to be smaller, so the first
    // length that admits an integer base already carries the smallest
    // one.
    for (let m = 60; m > 1; m--) {
        const base = baseForLength(value, m);
        if (base !== 0n) {
            return base.toString();
        }
    }
    // No representation of three 1s or longer fits; "11" in base
    // value - 1 always does.
    return (value - 1n).toString();
}

// 1 + k + ... + k^m rises strictly with k, so grow a power-of-two bound
// past the target, then bisect down to the smallest base whose sum
// reaches value; that base is the hit when the sum equals value exactly.
function baseForLength(value: bigint, m: number): bigint {
    let hi = 2n;
    while (sumCapped(hi, m, value) <= value) {
        hi *= 2n;
    }
    let lo = 2n;
    while (lo < hi) {
        const mid = (lo + hi) / 2n;
        if (sumCapped(mid, m, value) < value) {
            lo = mid + 1n;
        } else {
            hi = mid;
        }
    }
    return sumCapped(lo, m, value) === value ? lo : 0n;
}

// The geometric sum, capped at "already past value": comparing the term
// against value / k before multiplying is an early exit under BigInt -
// and the overflow guard in the fixed-width languages.
function sumCapped(k: bigint, m: number, value: bigint): bigint {
    let total = 1n;
    let term = 1n;
    for (let i = 0; i < m; i++) {
        if (term > value / k) {
            return value + 1n;
        }
        term *= k;
        total += term;
        if (total > value) {
            return value + 1n;
        }
    }
    return total;
}
