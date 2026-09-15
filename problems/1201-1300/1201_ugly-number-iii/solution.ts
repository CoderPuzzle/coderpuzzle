function nthUglyNumber(n: number, a: number, b: number, c: number): number {
    const ab = lcm(a, b),
        ac = lcm(a, c),
        bc = lcm(b, c);
    const abc = lcm(ab, c);
    // count(x) is non-decreasing, so binary search the smallest x with
    // count(x) >= n — that x is itself ugly; hi is the answer ceiling
    let lo = 1,
        hi = 2000000000;
    while (lo < hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        if (count(mid, a, b, c, ab, ac, bc, abc) >= n) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
}

function count(x: number, a: number, b: number, c: number, ab: number, ac: number, bc: number, abc: number): number {
    // ugly numbers <= x via inclusion-exclusion: add each divisor's
    // multiples, subtract the pairwise lcms (counted twice), add
    // back the triple lcm
    return (
        Math.floor(x / a) +
        Math.floor(x / b) +
        Math.floor(x / c) -
        Math.floor(x / ab) -
        Math.floor(x / ac) -
        Math.floor(x / bc) +
        Math.floor(x / abc)
    );
}

function gcd(x: number, y: number): number {
    while (y !== 0) {
        const t = x % y;
        x = y;
        y = t;
    }
    return x;
}

function lcm(x: number, y: number): number {
    return (x / gcd(x, y)) * y;
}
