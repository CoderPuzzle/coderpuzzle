function minEnd(n: number, x: number): number {
    // Every element must contain every bit of x, so candidates are exactly
    // the supersets of x, ascending — their counter is spread over the zero
    // positions of x. The answer merges x with (n - 1): walk bit slots
    // upward, pushing each bit of (n - 1) into the next zero slot of x.
    // Answers stop at bit 52 (x <= 10^8 keeps one of the low 27 bits free,
    // so free rank r lands at position <= r + 26), inside Number's exact
    // window; powers of two replace 32-bit shifts, which wrap past bit 31,
    // and floor-divide/modulo stay exact below 2^53.
    let ans = x;
    let k = n - 1;
    let pow = 1;
    while (k > 0) {
        if (Math.floor(ans / pow) % 2 === 0) {
            if (k % 2 === 1) {
                ans += pow;
            }
            k = Math.floor(k / 2);
        }
        pow *= 2;
    }
    return ans;
}
