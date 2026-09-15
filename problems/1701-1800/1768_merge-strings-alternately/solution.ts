function mergeAlternately(word1: string, word2: string): string {
    // One pointer per word: emit alternately while both words still
    // have characters, then append whichever tail remains.
    const out: string[] = [];
    let i = 0;
    let j = 0;
    while (i < word1.length && j < word2.length) {
        out.push(word1[i]);
        out.push(word2[j]);
        i++;
        j++;
    }
    out.push(word1.slice(i), word2.slice(j));
    return out.join("");
}
