function isDigitorialPermutation(n: number): boolean {
    // The factorial digit sum ignores digit order, so every
    // permutation of n shares one sum s. A digitorial permutation p
    // of n must equal its own factorial digit sum, which is also s,
    // so p = s and p reuses exactly n's digits. Conversely, when s
    // uses exactly n's digits, s itself is a leading-zero-free
    // arrangement of them (s >= 1) and equals its own factorial
    // digit sum. With n <= 10^9, s <= 10 * 9! = 3,628,800, far under
    // Number's exact 2^53 range, so plain arithmetic is safe.
    const fact = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880];
    const digits = String(n);
    let s = 0;
    for (const c of digits) {
        s += fact[Number(c)];
    }
    const a = digits.split("").sort().join("");
    const b = String(s).split("").sort().join("");
    return a === b;
}
