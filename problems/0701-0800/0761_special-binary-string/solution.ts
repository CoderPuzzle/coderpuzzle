function makeLargestSpecial(s: string): string {
    // A swap trades two adjacent special blocks, so the pieces that can
    // move are the top-level special substrings — mountains, each closed
    // exactly when the running count (+1 on '1', -1 on '0') returns to
    // zero. Maximize every mountain from the inside out: its inside is
    // itself special, because the count stays positive until the closing
    // '0', so recurse on the inside, re-wrap in the outer 1...0, and lay
    // the maximal mountains out largest-first.
    const parts: string[] = [];
    let count = 0;
    let start = 0;
    for (let i = 0; i < s.length; i++) {
        count += s[i] === "1" ? 1 : -1;
        if (count === 0) {
            // The climb: the outer 1...0 goes on only after the inside is
            // maximal — "11011000" wraps its maximized inside "110010" into
            // "11100100".
            parts.push("1" + makeLargestSpecial(s.substring(start + 1, i)) + "0");
            start = i + 1;
        }
    }
    // Largest-first order is the largest concatenation of the fixed maximal
    // block set — an explicit descending comparator, never the default
    // ascending sort.
    parts.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));
    return parts.join("");
}
