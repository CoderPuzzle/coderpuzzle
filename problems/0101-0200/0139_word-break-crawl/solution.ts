function wordBreak(s: string, wordDict: string[]): boolean {
    // Bottom-up DP over prefix reachability: reachable[i] says the first i
    // characters of s split into dictionary words. The empty prefix is
    // reachable, and the answer is reachable[s.length].
    const words = new Set(wordDict);
    const lengths = [...new Set(wordDict.map((word) => word.length))].sort((a, b) => a - b);
    const reachable = new Array<boolean>(s.length + 1).fill(false);
    reachable[0] = true;
    for (let i = 1; i <= s.length; ++i) {
        for (const length of lengths) {
            if (length > i) break;
            // Position i ends a word exactly when the prefix before it is
            // reachable and the slice ending here is a dictionary word.
            if (reachable[i - length] && words.has(s.slice(i - length, i))) {
                reachable[i] = true;
                break;
            }
        }
    }
    return reachable[s.length];
}
