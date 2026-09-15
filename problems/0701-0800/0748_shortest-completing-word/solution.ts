function shortestCompletingWord(licensePlate: string, words: string[]): string {
    // The plate's demand: how many of each letter a word must supply.
    // ASCII puts every uppercase letter in 65..90 and its lowercase
    // twin 32 codes higher, so one range check + 32 folds the case;
    // digits and spaces match neither range and demand nothing.
    const plate = new Array<number>(26).fill(0);
    for (let i = 0; i < licensePlate.length; i++) {
        let code = licensePlate.charCodeAt(i);
        if (code >= 65 && code <= 90) {
            code += 32;
        }
        if (code >= 97 && code <= 122) {
            plate[code - 97]++;
        }
    }
    let best = "";
    for (const word of words) {
        // First-wins: only a strictly shorter word can displace the
        // best seen so far, so equal or longer words are skipped
        // without even counting their letters.
        if (best !== "" && word.length >= best.length) {
            continue;
        }
        const counts = new Array<number>(26).fill(0);
        for (let i = 0; i < word.length; i++) {
            counts[word.charCodeAt(i) - 97]++;
        }
        // Covering: the word holds at least the plate's multiplicity
        // of every letter. Extra letters are free.
        let completes = true;
        for (let i = 0; i < 26; i++) {
            if (counts[i] < plate[i]) {
                completes = false;
                break;
            }
        }
        if (completes) {
            best = word;
        }
    }
    // The statement guarantees a completing word exists, so best is
    // never empty on valid input.
    return best;
}
