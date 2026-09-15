function isPowerOfFour(n: number): boolean {
    // A power of four is a power of two whose lone set bit sits at an even
    // index (4ˣ = 2²ˣ): the low-bit clear test (n & (n - 1)) == 0 isolates
    // the lone-bit values, then the mask 0x55555555 — 0101…0101, the even
    // indexes 0 through 30 — keeps exactly the even ones, 4⁰ through 4¹⁵
    // (2³⁰, the largest that fits a signed 32-bit integer). The n > 0
    // guard rejects zero and the negatives, which arrive signed to -2³¹.
    return n > 0 && (n & (n - 1)) === 0 && (n & 0x55555555) !== 0;
}
