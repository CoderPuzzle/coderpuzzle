function findTheLongestSubstring(s: string): number {
    const vowelBit: { [k: string]: number } = { a: 1, e: 2, i: 4, o: 8, u: 16 };
    const first: number[] = new Array(32).fill(-2);
    // empty prefix already has even counts, so a whole-prefix window qualifies
    first[0] = -1;
    let mask = 0;
    let best = 0;
    for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if (ch in vowelBit) {
            mask ^= vowelBit[ch];
        }
        // equal masks at two indices => all vowel counts even between them;
        // keep only the first occurrence of each mask (earliest maximizes length)
        if (first[mask] !== -2) {
            if (i - first[mask] > best) {
                best = i - first[mask];
            }
        } else {
            first[mask] = i;
        }
    }
    return best;
}
