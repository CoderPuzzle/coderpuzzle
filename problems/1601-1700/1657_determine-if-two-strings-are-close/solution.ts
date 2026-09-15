function closeStrings(word1: string, word2: string): boolean {
    // Neither operation creates or destroys a letter: Operation 1 only
    // rearranges characters, and Operation 2 swaps the totals of two
    // existing letters. Two strings are therefore close exactly when
    // they occur over the same letter set with the same multiset of
    // frequencies — tallied into 26-slot count arrays, presence compared
    // slot by slot, then both arrays sorted and compared as lists.
    const counts1 = new Array<number>(26).fill(0);
    const counts2 = new Array<number>(26).fill(0);
    for (const c of word1) {
        counts1[c.charCodeAt(0) - 97]++;
    }
    for (const c of word2) {
        counts2[c.charCodeAt(0) - 97]++;
    }
    for (let i = 0; i < 26; i++) {
        if (counts1[i] > 0 !== counts2[i] > 0) {
            return false;
        }
    }
    counts1.sort((a, b) => a - b);
    counts2.sort((a, b) => a - b);
    return counts1.every((count, i) => count === counts2[i]);
}
