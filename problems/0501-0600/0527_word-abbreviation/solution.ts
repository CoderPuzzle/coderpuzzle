function wordsAbbreviation(words: string[]): string[] {
    // Every word starts at a one-letter prefix: first character, count of
    // the middle, last character. Abbreviations can only clash between
    // equal-length words sharing that prefix and their last letter, and the
    // cure is collective — every clashing group grows its prefix by one and
    // re-groups, until each abbreviation stands alone.
    const prefix: number[] = new Array(words.length).fill(1);
    const abbreviate = (i: number): string => {
        const word = words[i];
        const p = prefix[i];
        return word.slice(0, p) + (word.length - p - 1) + word[word.length - 1];
    };
    while (true) {
        const groups = new Map<string, number[]>();
        for (let i = 0; i < words.length; i++) {
            const key = abbreviate(i);
            if (!groups.has(key)) {
                groups.set(key, []);
            }
            groups.get(key)!.push(i);
        }
        let unique = true;
        for (const ids of groups.values()) {
            if (ids.length > 1) {
                unique = false;
                for (const i of ids) {
                    prefix[i] += 1;
                }
            }
        }
        if (unique) {
            break;
        }
    }
    return words.map((word, i) => {
        const abbr = abbreviate(i);
        // An abbreviation no shorter than the word itself buys nothing.
        return abbr.length < word.length ? abbr : word;
    });
}
