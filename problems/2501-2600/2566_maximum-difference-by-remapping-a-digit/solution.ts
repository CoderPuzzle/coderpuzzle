function minMaxDifference(num: number): number {
    // A remap rewrites every copy of one chosen digit, and the notes
    // allow leading zeroes plus mapping a digit to itself. That forces
    // the two greedy plays: promote every copy of the first digit that
    // is not already 9 up to 9 (a no-op when there is none), and
    // demote every copy of the leading digit down to 0. Both rewrites
    // only ever touch leftmost-first repeats, so any other choice
    // keeps some earlier position lower or higher than necessary.
    const digits = String(num);
    let big = digits;
    for (const ch of digits) {
        if (ch !== "9") {
            big = digits.split(ch).join("9");
            break;
        }
    }
    const small = digits.split(digits[0]).join("0");
    return Number(big) - Number(small);
}
