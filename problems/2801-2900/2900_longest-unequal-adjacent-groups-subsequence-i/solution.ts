function getLongestSubsequence(words: string[], groups: number[]): string[] {
    // Taking the first element of every maximal run of equal group values
    // pins one deterministic answer out of the many the statement permits.
    const result: string[] = [words[0]];
    for (let i = 1; i < groups.length; ++i) {
        if (groups[i] !== groups[i - 1]) result.push(words[i]);
    }
    return result;
}
