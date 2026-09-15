function baseNeg2(n: number): string {
    // Pull off one digit at a time: the least-significant digit is n
    // reduced modulo 2, forced into {0, 1} since TypeScript's % truncates
    // toward zero and can report -1 for a negative n. What's left is
    // divided by -2 to expose the next digit. n = 0 is handled directly
    // since the loop body never runs for it.
    if (n === 0) {
        return "0";
    }
    const digits: string[] = [];
    while (n !== 0) {
        let remainder = n % 2;
        if (remainder < 0) {
            remainder += 2;
        }
        digits.push(String(remainder));
        n = (n - remainder) / -2;
    }
    return digits.reverse().join("");
}
