function minimizeConcatenatedLength(words: string[]): number {
    // dp[first][last] = shortest length of a concatenation of the words
    // processed so far starting with `first` and ending with `last`.
    const INF = Infinity;
    const dp: number[][] = Array.from({ length: 26 }, () => Array(26).fill(INF));
    dp[words[0].charCodeAt(0) - 97][words[0].charCodeAt(words[0].length - 1) - 97] = words[0].length;
    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const wordFirst = word.charCodeAt(0) - 97;
        const wordLast = word.charCodeAt(word.length - 1) - 97;
        const length = word.length;
        const ndp: number[][] = Array.from({ length: 26 }, () => Array(26).fill(INF));
        for (let f = 0; f < 26; f++) {
            for (let l = 0; l < 26; l++) {
                const current = dp[f][l];
                if (current === INF) continue;
                // Append on the right: seam merges when our last char equals
                // the word's first char.
                let appended = current + length;
                if (l === wordFirst) appended--;
                if (appended < ndp[f][wordLast]) ndp[f][wordLast] = appended;
                // Prepend on the left: seam merges when the word's last char
                // equals our first char.
                let prepended = current + length;
                if (wordLast === f) prepended--;
                if (prepended < ndp[wordFirst][l]) ndp[wordFirst][l] = prepended;
            }
        }
        for (let f = 0; f < 26; f++) {
            for (let l = 0; l < 26; l++) {
                dp[f][l] = ndp[f][l];
            }
        }
    }
    let best = INF;
    for (let f = 0; f < 26; f++) {
        for (let l = 0; l < 26; l++) {
            best = Math.min(best, dp[f][l]);
        }
    }
    return best;
}
