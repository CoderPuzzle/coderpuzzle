function addBinary(a: string, b: string): string {
    // Walk both strings from their right ends, adding the way
    // pencil-and-paper binary addition does: one digit from each input plus
    // the carry in, one result digit and a new carry out.
    let i = a.length - 1;
    let j = b.length - 1;
    let carry = 0;
    const digits: string[] = [];
    // Running while either input has digits left or a carry is pending
    // absorbs both uneven lengths (the shorter input just stops
    // contributing, no padding) and the final carry ("11" + "1" = "100")
    // with no special cases after the loop.
    while (i >= 0 || j >= 0 || carry > 0) {
        let total = carry;
        if (i >= 0) total += a.charCodeAt(i--) - 48;
        if (j >= 0) total += b.charCodeAt(j--) - 48;
        // total is at most 3 (1 + 1 + carry), so its low bit is the result
        // digit and the rest is the next carry. Only single characters are
        // ever converted, never the whole strings, which is what the
        // follow-up asks for.
        digits.push(String.fromCharCode(48 + (total % 2)));
        carry = Math.floor(total / 2);
    }
    // Digits were produced least-significant first; one reverse at the end
    // beats prepending each digit to the front.
    return digits.reverse().join("");
}
