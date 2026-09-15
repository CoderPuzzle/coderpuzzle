function countOfSubstrings(word: string, k: number): number {
    // For each start, grow the window rightward maintaining a 5-bit vowel
    // mask and a running consonant total; count every end where all five
    // vowels are present and exactly k consonants are inside.
    const n = word.length;
    let total = 0;
    for (let start = 0; start < n; ++start) {
        let seen = 0;
        let consonants = 0;
        for (let end = start; end < n; ++end) {
            switch (word[end]) {
                case "a":
                    seen |= 1 << 0;
                    break;
                case "e":
                    seen |= 1 << 1;
                    break;
                case "i":
                    seen |= 1 << 2;
                    break;
                case "o":
                    seen |= 1 << 3;
                    break;
                case "u":
                    seen |= 1 << 4;
                    break;
                default:
                    consonants++;
            }
            if (seen === 31 && consonants === k) {
                total++;
            }
        }
    }
    return total;
}
