function isItPossible(word1: string, word2: string): boolean {
    // One frequency array per word: any single move shifts exactly two
    // buckets, so its effect on the distinct counts is O(1) to evaluate.
    const c1 = new Array<number>(26).fill(0);
    const c2 = new Array<number>(26).fill(0);
    for (let k = 0; k < word1.length; k++) {
        c1[word1.charCodeAt(k) - 97]++;
    }
    for (let k = 0; k < word2.length; k++) {
        c2[word2.charCodeAt(k) - 97]++;
    }
    const distinct = (c: number[]): number => c.reduce((acc, v) => acc + (v > 0 ? 1 : 0), 0);
    const n1 = distinct(c1);
    const n2 = distinct(c2);
    // Try every ordered pair (a, b): letter a leaves word1 and letter b
    // takes its place; equal letters mean the swap changes nothing.
    for (let a = 0; a < 26; a++) {
        if (c1[a] === 0) continue;
        for (let b = 0; b < 26; b++) {
            if (c2[b] === 0) continue;
            if (a === b) {
                // Swapping identical letters changes nothing, so this
                // candidate succeeds exactly when the words already tie.
                if (n1 === n2) return true;
                continue;
            }
            const d1 = n1 - (c1[a] === 1 ? 1 : 0) + (c1[b] === 0 ? 1 : 0);
            const d2 = n2 - (c2[b] === 1 ? 1 : 0) + (c2[a] === 0 ? 1 : 0);
            if (d1 === d2) return true;
        }
    }
    return false;
}
