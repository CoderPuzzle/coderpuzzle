function nonSpecialCount(l: number, r: number): number {
    // A number is special exactly when it is the square of a prime:
    // p*p has precisely the proper divisors 1 and p, any other number
    // has more than two (three divisors total forces the form
    // prime^2), and 1 itself has none. The specials in [l, r] are
    // therefore the squares of primes in [ceil(sqrt(l)),
    // floor(sqrt(r))] — at most sqrt(10^9) ~ 31623 candidates, counted
    // with one sieve. Every value here stays far below 2^53 (r <= 10^9,
    // squares below 31700^2 ~ 1.01e9), so JavaScript numbers are exact
    // integers throughout; Math.sqrt is only a hint, corrected with
    // exact integer multiplies so rounding can never move a boundary.
    const isqrt = (x: number): number => {
        let s = Math.floor(Math.sqrt(x));
        while (s * s > x) {
            --s;
        }
        while ((s + 1) * (s + 1) <= x) {
            ++s;
        }
        return s;
    };
    const hi = isqrt(r);
    const lo = isqrt(l - 1) + 1; // smallest s with s*s >= l
    const composite = new Uint8Array(hi + 1);
    let specials = 0;
    for (let p = 2; p <= hi; ++p) {
        if (composite[p]) {
            continue;
        }
        if (p >= lo) {
            ++specials;
        }
        for (let m = p * p; m <= hi; m += p) {
            composite[m] = 1;
        }
    }
    return r - l + 1 - specials;
}
