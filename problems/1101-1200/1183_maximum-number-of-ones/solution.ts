function maximumNumberOfOnes(width: number, height: number, sideLength: number, maxOnes: number): number {
    // Each residue class (r, c) mod sideLength appears in every window
    // exactly once, so the constraint binds classes. Count how many grid
    // cells fall into each class: full blocks plus the leftover strip when
    // the remainder reaches r (or c).
    const counts: number[] = [];
    for (let r = 0; r < sideLength; r++) {
        for (let c = 0; c < sideLength; c++) {
            const rows = Math.floor(height / sideLength) + (height % sideLength > r ? 1 : 0);
            const cols = Math.floor(width / sideLength) + (width % sideLength > c ? 1 : 0);
            counts.push(rows * cols);
        }
    }
    counts.sort((a, b) => b - a);
    let total = 0;
    for (let i = 0; i < maxOnes; i++) {
        total += counts[i];
    }
    return total;
}
