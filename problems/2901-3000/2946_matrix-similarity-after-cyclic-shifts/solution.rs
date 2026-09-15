impl Solution {
    pub fn are_similar(mat: Vec<Vec<i32>>, k: i32) -> bool {
        // After k steps an even row is its original left-rotated by k and
        // an odd row its original right-rotated by k, both mod the row
        // length. A row is invariant under rotation by d exactly when it
        // is invariant under -d, so one modular comparison per cell
        // settles both parities and no intermediate matrices are built.
        let n = mat[0].len();
        let d = (k % n as i32) as usize;
        if d == 0 {
            return true;
        }
        for row in &mat {
            for j in 0..n {
                if row[j] != row[(j + d) % n] {
                    return false;
                }
            }
        }
        true
    }
}
