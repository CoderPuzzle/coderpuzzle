function stoneGameVIII(stones: number[]): number {
    // The row is always [prefix[j], stones[j], ...]; a move from frontier
    // j nets exactly prefix[k] for the chosen k>j, so
    // f(j) = max_{k>j}(prefix[k] - f(k)). One running maximum S folds
    // candidate k=j via S <- max(S, prefix[j-1] - S). |values| <= 2e9 so
    // plain numbers are exact here.
    let run = 0;
    for (const v of stones) {
        run += v;
    }
    let best = run;
    for (let j = stones.length - 1; j >= 2; j--) {
        run -= stones[j];
        const cand = run - best;
        if (cand > best) {
            best = cand;
        }
    }
    return best;
}
