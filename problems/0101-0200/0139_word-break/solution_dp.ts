function wordBreak(s: string, wordDict: string[]): boolean {
    const words = new Set(wordDict);
    const n = s.length;
    // reachable[i]: the prefix s[0..i) can be segmented; the empty prefix is
    // trivially segmentable.
    const reachable: boolean[] = new Array(n + 1).fill(false);
    reachable[0] = true;
    for (let i = 1; i <= n; i++) {
        // Any segmentation of s[0..i) ends with a last word s[j..i).
        for (let j = 0; j < i; j++) {
            if (reachable[j] && words.has(s.substring(j, i))) {
                reachable[i] = true;
                // Only feasibility matters, so stop at the first split.
                break;
            }
        }
    }
    return reachable[n];
}
