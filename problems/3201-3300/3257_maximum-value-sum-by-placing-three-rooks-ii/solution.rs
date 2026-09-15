impl Solution {
    pub fn maximum_value_sum(board: Vec<Vec<i32>>) -> i64 {
        // The three rooks occupy three distinct rows; pick the middle row i.
        // top[i][j] is the best cell in column j above row i and bottom[i][j]
        // the best below. A placement takes one column from the top band, one
        // from row i, one from the bottom band, all distinct — and only each
        // band's three best columns can matter, so 27 combinations per middle
        // row are exact. Sums reach 3 * 10^9, past the 32-bit range.
        let m = board.len();
        let n = board[0].len();
        let mut top = vec![vec![0i64; n]; m];
        let mut bottom = vec![vec![0i64; n]; m];
        for j in 0..n {
            top[0][j] = board[0][j] as i64;
            for i in 1..m {
                top[i][j] = top[i - 1][j].max(board[i][j] as i64);
            }
            bottom[m - 1][j] = board[m - 1][j] as i64;
            for i in (0..m - 1).rev() {
                bottom[i][j] = bottom[i + 1][j].max(board[i][j] as i64);
            }
        }
        let pick = |vals: &[i64]| -> Vec<usize> {
            let mut idx: Vec<usize> = (0..vals.len()).collect();
            idx.sort_by(|&a, &b| vals[b].cmp(&vals[a]));
            idx.truncate(3);
            idx
        };
        let mut ans = i64::MIN;
        for i in 1..m - 1 {
            let mid: Vec<i64> = board[i].iter().map(|&v| v as i64).collect();
            for &ca in &pick(&top[i - 1]) {
                for &cb in &pick(&mid) {
                    if cb == ca {
                        continue;
                    }
                    for &cc in &pick(&bottom[i + 1]) {
                        if cc == ca || cc == cb {
                            continue;
                        }
                        ans = ans.max(top[i - 1][ca] + mid[cb] + bottom[i + 1][cc]);
                    }
                }
            }
        }
        ans
    }
}
