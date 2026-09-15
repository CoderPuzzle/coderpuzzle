// Each iteration pushes n's lowest bit onto the accumulator, which has just
// been shifted left, so bit i of n ends at position 31 - i. >>> is the
// unsigned shift; >>> 0 hands the pattern back non-negative.
function reverseBits(n: number): number {
    let remaining = n;
    let reversed = 0;
    for (let i = 0; i < 32; ++i) {
        reversed = (reversed << 1) | (remaining & 1);
        remaining >>>= 1;
    }
    return reversed >>> 0;
}
