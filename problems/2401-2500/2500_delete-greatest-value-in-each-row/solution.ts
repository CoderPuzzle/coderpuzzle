function deleteGreatestValue(grid: number[][]): number {
    // Sorting each row descending settles in one shot what every round
    // would delete from it: round k takes each row's k-th largest value.
    // The round's contribution is then just the max over rows of that
    // k-th largest -- no heap or marking simulation needed.
    const rows = grid.map((row) => [...row].sort((a, b) => b - a));
    let answer = 0;
    for (let j = 0; j < rows[0].length; ++j) {
        let best = 0;
        for (let i = 0; i < rows.length; ++i) best = Math.max(best, rows[i][j]);
        answer += best;
    }
    return answer;
}
