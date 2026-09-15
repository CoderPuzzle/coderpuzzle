function reverseWords(s: string): string {
    // The first word only fixes the target vowel count; each later word
    // matching it is reversed in place, everything else (word order,
    // separators) stays as-is.
    const words = s.split(" ");
    const countVowels = (word: string): number => {
        let count = 0;
        for (const c of word) {
            if (c === "a" || c === "e" || c === "i" || c === "o" || c === "u") {
                count++;
            }
        }
        return count;
    };
    const target = countVowels(words[0]);
    for (let i = 1; i < words.length; i++) {
        if (countVowels(words[i]) === target) {
            words[i] = words[i].split("").reverse().join("");
        }
    }
    return words.join(" ");
}
