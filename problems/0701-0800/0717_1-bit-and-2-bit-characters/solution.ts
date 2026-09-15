function isOneBitCharacter(bits: number[]): boolean {
    // A character starting at a 0 can only be the one-bit
    // character, and a character starting at a 1 can only be a
    // two-bit character that also swallows the bit after it. So
    // the decode is forced: walk it from the left, and the answer
    // is whether the last step starts on the last bit.
    let i = 0;
    const n = bits.length;
    while (i < n - 1) {
        if (bits[i] === 1) {
            i += 2;
        } else {
            i += 1;
        }
    }
    return i === n - 1;
}
