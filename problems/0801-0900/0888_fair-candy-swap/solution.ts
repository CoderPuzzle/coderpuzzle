function fairCandySwap(aliceSizes: number[], bobSizes: number[]): number[] {
    // Swapping Alice's box a for Bob's box b leaves both totals equal
    // exactly when sumA - a + b == sumB - b + a, which rearranges to
    // b == a - delta with delta = (sumA - sumB) / 2. A hash set of
    // Bob's boxes answers each candidate in O(1), and one scan that
    // keeps the smallest matching pair (a first, then b) yields the
    // statement's pinned answer.
    let aliceTotal = 0;
    for (const size of aliceSizes) {
        aliceTotal += size;
    }
    let bobTotal = 0;
    for (const size of bobSizes) {
        bobTotal += size;
    }
    const delta = (aliceTotal - bobTotal) / 2;
    const bobBoxes = new Set<number>(bobSizes);
    let best: [number, number] | null = null;
    for (const size of aliceSizes) {
        const b = size - delta;
        const better = best === null || size < best[0] || (size === best[0] && b < best[1]);
        if (bobBoxes.has(b) && better) {
            best = [size, b];
        }
    }
    return best === null ? [] : best;
}
