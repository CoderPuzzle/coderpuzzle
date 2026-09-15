function numJewelsInStones(jewels: string, stones: string): number {
    // A stone counts when its letter is one of the jewel types. Those
    // types are case sensitive and English letters occupy two disjoint
    // ASCII bands, 65..90 and 97..122, so a direct 128-slot table keyed
    // by character code marks each jewel letter in place — 'a' and 'A'
    // land in different slots with no folding — and every stone then
    // costs one array lookup.
    const isJewel: boolean[] = new Array(128).fill(false);
    for (let i = 0; i < jewels.length; i++) {
        isJewel[jewels.charCodeAt(i)] = true;
    }
    let count = 0;
    for (let i = 0; i < stones.length; i++) {
        if (isJewel[stones.charCodeAt(i)]) {
            count++;
        }
    }
    return count;
}
