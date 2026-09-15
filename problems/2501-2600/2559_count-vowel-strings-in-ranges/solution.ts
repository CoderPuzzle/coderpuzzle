function vowelStrings(words: string[], queries: number[][]): number[] {
    // Prefix sums over the vowel-string marks: prefix[i+1] counts the
    // strings among words[0..i] that start and end with a vowel, so a
    // query [l, r] costs one subtraction. Counts stay below words length
    // <= 10^5, well inside Number precision.
    const vowels = new Set(["a", "e", "i", "o", "u"]);
    const prefix: number[] = new Array(words.length + 1).fill(0);
    for (let i = 0; i < words.length; ++i) {
        const w = words[i];
        prefix[i + 1] = prefix[i] + (vowels.has(w[0]) && vowels.has(w[w.length - 1]) ? 1 : 0);
    }
    return queries.map(([l, r]) => prefix[r + 1] - prefix[l]);
}
