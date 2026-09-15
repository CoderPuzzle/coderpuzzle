function numberOfSubstrings(s: string): number {
    // last occurrence of a/b/c so far; -1 = letter not seen yet
    const last = [-1, -1, -1];
    let count = 0;
    for (let i = 0; i < s.length; i++) {
        const idx = s.charCodeAt(i) - 97;
        if (idx >= 0 && idx <= 2) {
            last[idx] = i;
        }
        // substring s[l..i] is valid iff l <= min(last): every such left
        // endpoint yields one valid substring ending at i (0 until all seen)
        count += Math.min(last[0], last[1], last[2]) + 1;
    }
    return count;
}
