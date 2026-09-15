function countQuadruples(firstString: string, secondString: string): number {
    // Only single-character pairs can be optimal: a longer match
    // shrinks to its two leading characters (same a, smaller j), and
    // each letter does best pairing its first occurrence here with
    // its last occurrence there.
    const n1 = firstString.length;
    const first: number[] = new Array(26).fill(n1);
    const last: number[] = new Array(26).fill(-1);
    for (let i = 0; i < n1; i++) {
        const c = firstString.charCodeAt(i) - 97;
        if (first[c] === n1) {
            first[c] = i;
        }
    }
    for (let a = 0; a < secondString.length; a++) {
        last[secondString.charCodeAt(a) - 97] = a;
    }
    let best: number | null = null;
    let count = 0;
    for (let c = 0; c < 26; c++) {
        if (first[c] === n1 || last[c] === -1) {
            continue;
        }
        const diff = first[c] - last[c];
        if (best === null || diff < best) {
            best = diff;
            count = 1;
        } else if (diff === best) {
            count++;
        }
    }
    return count;
}
