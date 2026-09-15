function canConstruct(s: string, k: number): boolean {
    // Splitting all of s across k palindromes needs one character per string
    // at minimum, and every letter with an odd count must anchor the center
    // of a different palindrome. Both bounds are achievable simultaneously,
    // so checking them is enough.
    if (s.length < k) {
        return false;
    }
    const counts: number[] = new Array(26).fill(0);
    for (const ch of s) {
        ++counts[ch.charCodeAt(0) - 97];
    }
    let odd = 0;
    for (const count of counts) {
        odd += count % 2;
    }
    return odd <= k;
}
