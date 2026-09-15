// Collect the first character of every word, join them in order, and
// compare the joined acronym with s. Strict equality fails on unequal
// lengths just as it does on any differing character.
function isAcronym(words: string[], s: string): boolean {
    const letters: string[] = [];
    for (const word of words) {
        letters.push(word[0]);
    }
    return letters.join("") === s;
}
