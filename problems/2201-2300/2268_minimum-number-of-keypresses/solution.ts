function minimumKeypresses(s: string): number {
    // Each letter's press count is its position among the sorted
    // frequencies: the most frequent 9 are pressed once, the next 9 twice,
    // and the remaining 8 three times.
    const freq = new Array<number>(26).fill(0);
    for (const ch of s) freq[ch.charCodeAt(0) - 97]++;
    freq.sort((a, b) => b - a);
    let presses = 0;
    for (let rank = 0; rank < 26; ++rank) {
        presses += freq[rank] * (Math.floor(rank / 9) + 1);
    }
    return presses;
}
