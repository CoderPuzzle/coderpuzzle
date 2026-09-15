function sortSentence(s: string): string {
    // The trailing digit is the 1-indexed slot; drop each word into its
    // slot and rejoin.
    const words = s.split(" ");
    const out = new Array<string>(words.length);
    for (const w of words) {
        out[+w[w.length - 1] - 1] = w.slice(0, -1);
    }
    return out.join(" ");
}
