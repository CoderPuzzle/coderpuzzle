function boldWords(words: string[], s: string): string {
    // Mark every position of s covered by any keyword occurrence.
    const n = s.length;
    const mask = new Array<boolean>(n).fill(false);
    for (const word of words) {
        // Restart one past each hit so self-overlapping occurrences
        // ("aa" inside "aaa") are all found.
        let start = s.indexOf(word);
        while (start !== -1) {
            for (let i = start; i < start + word.length; i++) {
                mask[i] = true;
            }
            start = s.indexOf(word, start + 1);
        }
    }
    // Wrap each maximal run of marked positions in exactly one pair.
    let out = "";
    for (let i = 0; i < n; i++) {
        if (mask[i] && (i === 0 || !mask[i - 1])) {
            out += "<b>";
        } else if (!mask[i] && i > 0 && mask[i - 1]) {
            out += "</b>";
        }
        out += s[i];
    }
    if (n > 0 && mask[n - 1]) {
        out += "</b>";
    }
    return out;
}
