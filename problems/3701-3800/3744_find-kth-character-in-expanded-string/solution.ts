function kthCharacter(s: string, k: number): string {
    // A word's letter at offset i (0-based) fills i + 1 consecutive slots of
    // t and a space fills exactly one, so walking s while subtracting each
    // character's cost from k lands on the owner without ever materializing
    // t -- at the constraints t can span billions of characters. Plain number
    // arithmetic stays exact: t's largest length, about 5 * 10^9, sits far
    // below 2^53.
    let position = 0; // 0-based offset of the next character within its word
    for (const ch of s) {
        if (ch === " ") {
            position = 0;
            k -= 1;
        } else {
            position += 1;
            k -= position;
        }
        if (k < 0) {
            return ch;
        }
    }
    // Unreachable: k always names a valid slot of t.
    return "";
}
