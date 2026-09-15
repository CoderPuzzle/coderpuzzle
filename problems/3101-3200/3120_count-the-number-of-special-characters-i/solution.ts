function numberOfSpecialChars(word: string): number {
    // A letter is special iff both of its cases occur somewhere; mark the
    // two 26-slot case flags in one pass, then count full pairs.
    const lower = new Array<boolean>(26).fill(false);
    const upper = new Array<boolean>(26).fill(false);
    for (const ch of word) {
        const code = ch.charCodeAt(0);
        if (code >= 97) {
            lower[code - 97] = true;
        } else {
            upper[code - 65] = true;
        }
    }
    let count = 0;
    for (let k = 0; k < 26; k++) {
        if (lower[k] && upper[k]) {
            count++;
        }
    }
    return count;
}
