function makeEqual(words: string[]): boolean {
    // Pool all letters; n equal strings need each count % n == 0.
    const n = words.length;
    const counts = new Array<number>(26).fill(0);
    for (const w of words) {
        for (let i = 0; i < w.length; i++) {
            counts[w.charCodeAt(i) - 97]++;
        }
    }
    return counts.every((c) => c % n === 0);
}
