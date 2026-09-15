function maxNumberOfBalloons(text: string): number {
    const counts = new Array<number>(26).fill(0);
    for (const ch of text) {
        counts[ch.charCodeAt(0) - 97]++;
    }
    // balloon needs b, a, n once and l, o twice; the scarcest letter caps
    // the whole word.
    return Math.min(counts[1], counts[0], counts[13], Math.floor(counts[11] / 2), Math.floor(counts[14] / 2));
}
