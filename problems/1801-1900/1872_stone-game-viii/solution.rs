impl Solution {
    // The row is always [prefix[j], stones[j], ...]; a move from frontier
    // j nets exactly prefix[k] for the chosen k>j, so
    // f(j) = max_{k>j}(prefix[k] - f(k)). One running maximum S folds
    // candidate k=j via S <- max(S, prefix[j-1] - S).
    pub fn stone_game_viii(stones: Vec<i32>) -> i64 {
        let mut run: i64 = stones.iter().map(|&v| v as i64).sum();
        let mut best = run;
        for j in (2..stones.len()).rev() {
            run -= stones[j] as i64;
            best = best.max(run - best);
        }
        best
    }
}
