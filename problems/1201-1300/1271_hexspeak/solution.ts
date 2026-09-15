function toHexspeak(num: string): string {
    // Peel hex digits by repeated divmod — no format strings, so the digit
    // alphabet stays explicit: 0->O, 1->I, 10..15 -> A..F, and digits 2..9
    // make the representation invalid.
    const digits: number[] = [];
    let n = BigInt(num);
    while (true) {
        digits.push(Number(n % 16n));
        n /= 16n;
        if (n === 0n) {
            break;
        }
    }
    const letters: string[] = [];
    for (let i = digits.length - 1; i >= 0; i--) {
        const r = digits[i];
        if (r >= 2 && r <= 9) {
            return "ERROR";
        }
        letters.push(r <= 1 ? (r === 0 ? "O" : "I") : String.fromCharCode(65 + r - 10));
    }
    return letters.join("");
}
