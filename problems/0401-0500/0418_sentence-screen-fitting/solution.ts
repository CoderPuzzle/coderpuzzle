function wordsTyping(sentence: string[], rows: number, cols: number): number {
    const n = sentence.length;
    const lengths = sentence.map((word) => word.length);
    // One sentence "packet": every word plus its trailing space.
    const packet = lengths.reduce((sum, len) => sum + len + 1, 0);
    const nextStart: number[] = new Array(n).fill(-1);
    const rowWords: number[] = new Array(n).fill(0);
    let total = 0;
    let start = 0;
    for (let row = 0; row < rows; ++row) {
        if (nextStart[start] < 0) {
            // A row's fill depends only on the word it starts from, so
            // memoize (next start, words placed) per start index.
            let used = 0;
            let placed = 0;
            let j = start;
            // Finish the in-progress sentence pass, reaching word 0.
            while (j < n && used + lengths[j] <= cols) {
                used += lengths[j] + 1;
                placed += 1;
                j += 1;
            }
            if (j === n) {
                j = 0;
                if (used <= cols) {
                    // Aligned at word 0: whole packets fit wholesale,
                    // Math.floor((cols - used) / packet) of them, at once.
                    const full = Math.floor((cols - used) / packet);
                    placed += full * n;
                    used += full * packet;
                }
                // A sub-packet remainder: fewer than `packet` columns
                // left, so at most n more words, one by one.
                while (j < n && used + lengths[j] <= cols) {
                    used += lengths[j] + 1;
                    placed += 1;
                    j += 1;
                }
                if (j === n) {
                    j = 0;
                }
            }
            nextStart[start] = j;
            rowWords[start] = placed;
        }
        total += rowWords[start];
        start = nextStart[start];
    }
    // Every n consecutive words placed completes the sentence once.
    return Math.floor(total / n);
}
