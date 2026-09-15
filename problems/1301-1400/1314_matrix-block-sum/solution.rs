impl Solution {
    pub fn matrix_block_sum(mat: Vec<Vec<i32>>, k: i32) -> Vec<Vec<i32>> {
        let m = mat.len();
        let n = mat[0].len();
        // prefix[i+1][j+1] = sum of the rectangle (0,0)..(i,j); the extra zero
        // row and column remove all boundary special-casing.
        let mut prefix = vec![vec![0i64; n + 1]; m + 1];
        for i in 0..m {
            for j in 0..n {
                // Two-dimensional inclusion-exclusion: add above + left,
                // subtract the doubly-counted corner, add the cell.
                prefix[i + 1][j + 1] = prefix[i][j + 1] + prefix[i + 1][j] - prefix[i][j] + mat[i][j] as i64;
            }
        }
        let mut answer = vec![vec![0i32; n]; m];
        for i in 0..m {
            for j in 0..n {
                // Clamp the (i-k..i+k) window to the grid and convert it to
                // the half-open [r1,r2) x [c1,c2) form the table supports —
                // border cells just query a smaller rectangle.
                let r1 = i.saturating_sub(k as usize);
                let r2 = std::cmp::min(m, i + k as usize + 1);
                let c1 = j.saturating_sub(k as usize);
                let c2 = std::cmp::min(n, j + k as usize + 1);
                // Four lookups with alternating signs: O(1) for any k.
                answer[i][j] = (prefix[r2][c2] - prefix[r1][c2] - prefix[r2][c1] + prefix[r1][c1]) as i32;
            }
        }
        answer
    }
}
