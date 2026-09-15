function countPalindromicSubsequence(s: string): number {
    let count = 0;
    for (let c = 97; c <= 122; c++) {
        const ch = String.fromCharCode(c);
        // Palindrome ch-y-ch exists iff some y sits strictly between the
        // first and last occurrence of ch: anchoring the outers at the
        // outermost occurrences is the most permissive choice.
        const first = s.indexOf(ch);
        const last = s.lastIndexOf(ch);
        if (first !== -1 && last - first >= 2) {
            // Distinct chars only (a set, not positions) so each palindrome
            // is counted once despite repeated middle letters.
            const seen = new Set<string>();
            for (let i = first + 1; i < last; i++) seen.add(s[i]);
            count += seen.size;
        }
    }
    return count;
}
