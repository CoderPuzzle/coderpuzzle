// >>> works on the unsigned 32-bit view: a negative num becomes its
// two's-complement pattern and the shift is logical.
function toHex(num: number): string {
    // Zero never enters the nibble loop, so it gets its own answer here.
    if (num === 0) {
        return "0";
    }
    const alphabet = "0123456789abcdef";
    let value = num >>> 0;
    const digits: string[] = [];
    while (value !== 0) {
        // Take the low nibble, then shift the rest down by one digit.
        digits.push(alphabet[value & 0xf]);
        value >>>= 4;
    }
    // Nibbles come out lowest-first, so reverse for the answer.
    return digits.reverse().join("");
}
