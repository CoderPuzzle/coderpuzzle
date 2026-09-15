function countCharacters(words: string[], chars: string): number {
    const have: number[] = new Array(26).fill(0);
    for (const ch of chars) have[ch.charCodeAt(0) - 97]++;
    let total = 0;
    for (const word of words) {
        const need: number[] = new Array(26).fill(0);
        for (const ch of word) need[ch.charCodeAt(0) - 97]++;
        let ok = true;
        for (let i = 0; i < 26; ++i) {
            if (need[i] > have[i]) {
                ok = false;
                break;
            }
        }
        if (ok) total += word.length;
    }
    return total;
}
