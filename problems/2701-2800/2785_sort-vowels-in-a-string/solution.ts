// Consonants never move; only vowel values permute among the vowel
// slots. Collect the vowels, sort them by ASCII (every uppercase
// vowel sorts before every lowercase one, e.g. 'O' < 'e'), and pour
// them back into the vowel slots left to right.
function sortVowels(s: string): string {
    const isVowel = (c: string): boolean => "aeiouAEIOU".includes(c);
    const vowels = [...s].filter(isVowel).sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
    const chars = [...s];
    let i = 0;
    for (let k = 0; k < chars.length; k++) {
        if (isVowel(chars[k])) {
            chars[k] = vowels[i++];
        }
    }
    return chars.join("");
}
