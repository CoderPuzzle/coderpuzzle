function reverseStr(s: string, k: number): string {
    // Read the string as consecutive 2k-sized blocks: every block
    // contributes its first k characters reversed, its last k untouched.
    // Walking i in steps of 2k and reversing the window
    // [i, Math.min(i + k, n)) needs no special case for the tail — fewer
    // than k characters left makes the window short, so reversing it
    // reverses all of them, while k..2k-1 left makes the window exactly
    // the first k of them.
    const chars: string[] = s.split("");
    for (let i = 0; i < chars.length; i += 2 * k) {
        const end = Math.min(i + k, chars.length);
        for (let lo = i, hi = end - 1; lo < hi; ++lo, --hi) {
            [chars[lo], chars[hi]] = [chars[hi], chars[lo]];
        }
    }
    return chars.join("");
}
