function findAllConcatenatedWordsInADict(words: string[]): string[] {
    const dictionary = new Set<string>(words);

    const isConcatenated = (word: string): boolean => {
        const n = word.length;
        // Word-break DP: dp[i] = the first i chars split entirely into
        // dictionary words (dp[0] = empty prefix).
        const dp: boolean[] = new Array(n + 1).fill(false);
        dp[0] = true;
        for (let i = 1; i <= n; i++) {
            for (let j = 0; j < i; j++) {
                // Excluding the whole-word split forces >= 2 pieces; only
                // proper substrings are looked up, so the unfiltered set of
                // all words is safe.
                if (j === 0 && i === n) {
                    continue; // the word itself does not count as a part
                }
                if (dp[j] && dictionary.has(word.substring(j, i))) {
                    // One valid split per position suffices.
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[n];
    };

    const result: string[] = [];
    for (const word of words) {
        if (isConcatenated(word)) {
            result.push(word);
        }
    }
    return result;
}
