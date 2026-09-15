function minCharacters(a: string, b: string): number {
    // An operation retargets one character anywhere, so only letter
    // counts matter. Condition 3 unifies both strings on one letter c:
    // every character that is not already c pays once. Conditions 1
    // and 2 share a boundary after letter c — the lower string pays
    // its letters above c, the higher one its letters at or below c —
    // and one sweep with running below/above totals prices both
    // orientations at once. The boundary stops after 'y': nothing can
    // sit above 'z', so 'z' can never cap the lower string.
    const countsA = new Array<number>(26).fill(0);
    const countsB = new Array<number>(26).fill(0);
    for (const c of a) {
        countsA[c.charCodeAt(0) - 97]++;
    }
    for (const c of b) {
        countsB[c.charCodeAt(0) - 97]++;
    }
    let best = a.length + b.length;
    for (let i = 0; i < 26; i++) {
        best = Math.min(best, a.length - countsA[i] + b.length - countsB[i]);
    }
    let aboveA = a.length;
    let aboveB = b.length;
    let belowA = 0;
    let belowB = 0;
    for (let i = 0; i < 25; i++) {
        aboveA -= countsA[i];
        aboveB -= countsB[i];
        belowA += countsA[i];
        belowB += countsB[i];
        best = Math.min(best, aboveA + belowB, aboveB + belowA);
    }
    return best;
}
