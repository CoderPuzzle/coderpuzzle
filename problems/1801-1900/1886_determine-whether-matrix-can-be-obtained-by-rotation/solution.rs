impl Solution {
    // Try each of the four orientations. Clockwise rotation:
    // new[r][c] = old[n-1-c][r].
    pub fn find_rotation(mat: Vec<Vec<i32>>, target: Vec<Vec<i32>>) -> bool {
        let n = mat.len();
        let mut cur = mat;
        for _ in 0..4 {
            if cur == target {
                return true;
            }
            let mut nxt = vec![vec![0i32; n]; n];
            for r in 0..n {
                for c in 0..n {
                    nxt[r][c] = cur[n - 1 - c][r];
                }
            }
            cur = nxt;
        }
        false
    }
}
