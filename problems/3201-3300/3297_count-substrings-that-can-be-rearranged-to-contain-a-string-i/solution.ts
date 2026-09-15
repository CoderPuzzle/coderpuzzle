function validSubstringCount(word1: string, word2: string): number {
    // need[c] is how many copies of c a valid window must contain, and
    // missing counts the distinct letters whose quota is not yet met.
    const need = new Array<number>(26).fill(0);
    for (const ch of word2) {
        need[ch.charCodeAt(0) - 97]++;
    }
    let missing = 0;
    for (let c = 0; c < 26; ++c) {
        if (need[c] > 0) {
            missing++;
        }
    }
    const window = new Array<number>(26).fill(0);
    // The answer tops out at n*(n+1)/2 = 5000050000 for n = 10^5, which is
    // below 2^53, so IEEE double arithmetic stays exact throughout.
    let total = 0;
    let left = 0;
    const n = word1.length;
    for (let right = 0; right < n; ++right) {
        const ci = word1.charCodeAt(right) - 97;
        window[ci]++;
        if (window[ci] === need[ci]) {
            missing--;
        }
        if (missing === 0) {
            // Shrink while the left character is not load-bearing: its removal
            // leaves every quota intact. When this stops, [left..right] is the
            // minimal covering window ending at right, so starts 0..left all
            // yield valid substrings.
            while (window[word1.charCodeAt(left) - 97] - 1 >= need[word1.charCodeAt(left) - 97]) {
                window[word1.charCodeAt(left) - 97]--;
                left++;
            }
            total += left + 1;
        }
    }
    return total;
}
