function longestValidSubstring(word: string, forbidden: string[]): number {
    const banned = new Set<string>(forbidden);
    let maxLen = 0;
    for (const s of banned) {
        if (s.length > maxLen) {
            maxLen = s.length;
        }
    }
    const n = word.length;
    let left = 0;
    let ans = 0;
    // Validity is hereditary (shrinking a valid window stays valid), so a
    // two-pointer sweep finds the longest valid substring.
    for (let right = 0; right < n; right++) {
        // Only suffixes ending at right can be forbidden, each at most maxLen
        // (<= 10) long; nothing before left - 1 can matter since earlier
        // occurrences were already excluded.
        const start = Math.max(right - maxLen, left - 1);
        // Test suffixes shortest-first: the shortest match has the latest
        // start, so jumping left past it yields the largest window that
        // excludes every forbidden occurrence.
        for (let j = right; j > start; j--) {
            if (banned.has(word.substring(j, right + 1))) {
                left = j + 1;
                break;
            }
        }
        ans = Math.max(ans, right - left + 1);
    }
    return ans;
}
