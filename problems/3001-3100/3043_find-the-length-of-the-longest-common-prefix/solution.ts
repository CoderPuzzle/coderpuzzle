function longestCommonPrefix(arr1: number[], arr2: number[]): number {
    // A shared prefix of length L means the first L decimal digits agree,
    // so collect every decimal prefix of arr1 into a set.
    const prefixes = new Set<number>();
    for (const x of arr1) {
        let v = 0;
        // Fold digits left to right; each intermediate v is one prefix of x.
        for (const ch of String(x)) {
            v = v * 10 + (ch.charCodeAt(0) - 48);
            prefixes.add(v);
        }
    }
    let best = 0;
    for (const y of arr2) {
        let v = 0;
        const s = String(y);
        for (let i = 0; i < s.length; i++) {
            v = v * 10 + (s.charCodeAt(i) - 48);
            if (prefixes.has(v)) {
                if (i + 1 > best) best = i + 1;
            } else {
                // Prefixes nest: once one length of y misses, no longer
                // prefix of y can match either.
                break;
            }
        }
    }
    return best;
}
