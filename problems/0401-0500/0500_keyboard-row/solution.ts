function findWords(words: string[]): string[] {
    // One map from each letter to its keyboard row 0, 1 or 2, built once from
    // the three row listings: both cases of a letter land in the same bucket,
    // which is the whole case-insensitivity story.
    const rowOf = new Map<string, number>();
    ["qwertyuiop", "asdfghjkl", "zxcvbnm"].forEach((letters, row) => {
        for (const ch of letters) {
            rowOf.set(ch, row);
            rowOf.set(ch.toUpperCase(), row);
        }
    });
    // A word is typeable on one row iff no letter ever leaves the row its
    // first letter already fixed; the word keeps its own casing.
    return words.filter((word) => {
        const firstRow = rowOf.get(word[0])!;
        return [...word].every((ch) => rowOf.get(ch) === firstRow);
    });
}
