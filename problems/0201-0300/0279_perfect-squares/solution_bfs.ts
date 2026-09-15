function numSquares(n: number): number {
    // The squares available as subtractions, ascending — so the inner loop
    // can break as soon as s exceeds the remainder.
    const squares: number[] = [];
    for (let i = 1; i * i <= n; i++) squares.push(i * i);
    // Level-by-level BFS over remainders: level k holds every value
    // reachable from n by subtracting exactly k squares.
    let level = new Set<number>([n]);
    const seen = new Set<number>([n]);
    let steps = 0;
    while (level.size > 0) {
        steps++;
        const nextLevel = new Set<number>();
        for (const r of level) {
            for (const s of squares) {
                if (s > r) break;
                const t = r - s;
                // Reaching 0 at this depth settles the answer.
                if (t === 0) return steps;
                // First sight of a remainder is its shallowest depth; a
                // revisit through another square can never beat it.
                if (!seen.has(t)) {
                    seen.add(t);
                    nextLevel.add(t);
                }
            }
        }
        level = nextLevel;
    }
    // Lagrange's four-square theorem bounds the search at four levels, so
    // the loop always returns from inside.
    return steps;
}
