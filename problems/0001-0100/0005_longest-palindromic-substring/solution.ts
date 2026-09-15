function longestPalindrome(s: string): string {
    // Walk outward from a center while the two boundary characters match;
    // each expansion step is a single comparison.
    const expand = (left: number, right: number): [number, number] => {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        // Overshot by one on each side: back up to the widest palindrome.
        return [left + 1, right - 1];
    };
    // (0, 0) makes a single character the initial answer, so the
    // returned substring is never empty.
    let bestStart = 0,
        bestEnd = 0;
    for (let i = 0; i < s.length; i++) {
        // Try both center kinds: (i, i) for odd lengths, (i, i + 1) for
        // even ones; at the last gap the even case fails immediately.
        const centers: [number, number][] = [expand(i, i), expand(i, i + 1)];
        for (const [l, r] of centers) {
            // Strict > keeps an earlier palindrome on ties, so the
            // leftmost longest one wins ("babad" -> "bab", not "aba").
            if (r - l > bestEnd - bestStart) {
                bestStart = l;
                bestEnd = r;
            }
        }
    }
    return s.slice(bestStart, bestEnd + 1);
}
