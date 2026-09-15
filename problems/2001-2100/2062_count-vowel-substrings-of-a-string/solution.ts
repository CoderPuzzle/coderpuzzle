function vowelSubstringBit(character: string): number {
    if (character === "a") return 1;
    if (character === "e") return 2;
    if (character === "i") return 4;
    if (character === "o") return 8;
    if (character === "u") return 16;
    return 0;
}

function countVowelSubstrings(word: string): number {
    let total = 0;
    for (let start = 0; start < word.length; ++start) {
        let mask = 0;
        for (let end = start; end < word.length; ++end) {
            const bit = vowelSubstringBit(word[end]);
            if (bit === 0) break;
            mask |= bit;
            if (mask === 31) ++total;
        }
    }
    return total;
}
