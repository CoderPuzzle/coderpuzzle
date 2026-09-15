function maxProduct(words: string[]): number {
    // Only the set of distinct letters matters: compress each word into
    // a 26-bit mask (bit set per letter present) plus its length.
    const masks: Array<[number, number]> = words.map((word) => {
        let mask = 0;
        for (let i = 0; i < word.length; i++) {
            mask |= 1 << (word.charCodeAt(i) - 97);
        }
        return [mask, word.length] as [number, number];
    });
    let best = 0;
    const n = masks.length;
    for (let i = 0; i < n; i++) {
        const [mi, li] = masks[i];
        for (let j = i + 1; j < n; j++) {
            const [mj, lj] = masks[j];
            // Masks AND to zero exactly when the words share no letter.
            if ((mi & mj) === 0 && li * lj > best) {
                best = li * lj;
            }
        }
    }
    return best;
}
