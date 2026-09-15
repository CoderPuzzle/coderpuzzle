impl Solution {
    pub fn paths_with_max_score(board: Vec<String>) -> Vec<i32> {
        const MOD: i32 = 1000000007;
        let n = board.len();
        // score[i][j] is the best sum reachable at (i, j) from 'S', and
        // ways[i][j] counts the paths achieving it; -1 marks unreachable.
        let mut score = vec![vec![-1i32; n]; n];
        let mut ways = vec![vec![0i32; n]; n];
        score[n - 1][n - 1] = 0;
        ways[n - 1][n - 1] = 1;
        let dirs = [(1usize, 0usize), (0, 1), (1, 1)];
        // Sweep bottom-up so every incoming cell (below, right, below-right)
        // is already resolved when a cell is visited. The start square is
        // seeded above and skipped here.
        for i in (0..n).rev() {
            for j in (0..n).rev() {
                if board[i].as_bytes()[j] == b'X' || (i == n - 1 && j == n - 1) {
                    continue;
                }
                let mut best = -1;
                let mut total = 0;
                for &(di, dj) in &dirs {
                    let ni = i + di;
                    let nj = j + dj;
                    if ni >= n || nj >= n || score[ni][nj] < 0 {
                        continue;
                    }
                    if score[ni][nj] > best {
                        best = score[ni][nj];
                        total = ways[ni][nj];
                    } else if score[ni][nj] == best {
                        total = (total + ways[ni][nj]) % MOD;
                    }
                }
                if best >= 0 {
                    let cell = board[i].as_bytes()[j];
                    let digit = if cell.is_ascii_digit() { (cell - b'0') as i32 } else { 0 };
                    score[i][j] = best + digit;
                    ways[i][j] = total % MOD;
                }
            }
        }
        if ways[0][0] == 0 {
            return vec![0, 0];
        }
        vec![score[0][0], ways[0][0]]
    }
}
