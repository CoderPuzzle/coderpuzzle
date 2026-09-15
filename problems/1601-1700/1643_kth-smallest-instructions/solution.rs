impl Solution {
    pub fn kth_smallest_path(destination: Vec<i32>, k: i32) -> String {
        let row = destination[0];
        let col = destination[1];
        let n = (row + col) as usize;
        // binom[i][j] = C(i, j), built as Pascal's triangle up to n so
        // every count is available without computing a factorial; row,
        // col <= 15 keeps every entry well under i32::MAX (kept as i64
        // here for headroom).
        let mut binom = vec![vec![0i64; n + 1]; n + 1];
        for i in 0..=n {
            binom[i][0] = 1;
            binom[i][i] = 1;
            for j in 1..i {
                binom[i][j] = binom[i - 1][j - 1] + binom[i - 1][j];
            }
        }

        let mut remaining_h = col;
        let mut remaining_v = row;
        let mut k = k as i64;
        let mut path = String::with_capacity(n);
        for _ in 0..n {
            if remaining_h == 0 {
                path.push('V');
                remaining_v -= 1;
            } else if remaining_v == 0 {
                path.push('H');
                remaining_h -= 1;
            } else {
                // Completions starting with 'H': the remaining
                // (remaining_h - 1) H's and remaining_v V's fill the rest
                // of the string in any order, so this count is
                // C(remaining_h - 1 + remaining_v, remaining_v).
                let count_if_h = binom[(remaining_h - 1 + remaining_v) as usize][remaining_v as usize];
                if k <= count_if_h {
                    path.push('H');
                    remaining_h -= 1;
                } else {
                    k -= count_if_h;
                    path.push('V');
                    remaining_v -= 1;
                }
            }
        }
        path
    }
}
