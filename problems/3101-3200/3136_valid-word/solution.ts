function isValid(word: string): boolean {
    // One scan: reject any character outside digits/letters while tracking
    // whether a vowel and a consonant were both seen.
    if (word.length < 3) return false;
    const vowels = "aeiou";
    let hasVowel = false;
    let hasConsonant = false;
    for (const ch of word) {
        if ((ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z")) {
            if (vowels.includes(ch.toLowerCase())) {
                hasVowel = true;
            } else {
                hasConsonant = true;
            }
        } else if (ch >= "0" && ch <= "9") {
            continue;
        } else {
            return false;
        }
    }
    return hasVowel && hasConsonant;
}
