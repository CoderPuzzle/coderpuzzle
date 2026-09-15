impl Solution {
    pub fn update_matrix(mat: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let m = mat.len();
        let n = mat[0].len();
        // No cell sits farther than m*n steps from a zero, so that value
        // stands in for "not yet settled" without colliding with a real
        // distance; zero cells start settled at 0.
        let far = (m * n + 1) as i32;
        let mut dist = vec![vec![far; n]; m];
        for i in 0..m {
            for j in 0..n {
                if mat[i][j] == 0 {
                    dist[i][j] = 0;
                }
            }
        }
        // Forward sweep: each cell learns from the top and left neighbours,
        // so every zero up and to the left has already done its work here.
        for i in 0..m {
            for j in 0..n {
                if i > 0 {
                    dist[i][j] = dist[i][j].min(dist[i - 1][j] + 1);
                }
                if j > 0 {
                    dist[i][j] = dist[i][j].min(dist[i][j - 1] + 1);
                }
            }
        }
        // Backward sweep: the same argument with the bottom and right
        // neighbours, so a nearest zero in any direction has now been
        // heard from — whichever sweep met the closer zero wins.
        for i in (0..m).rev() {
            for j in (0..n).rev() {
                if i + 1 < m {
                    dist[i][j] = dist[i][j].min(dist[i + 1][j] + 1);
                }
                if j + 1 < n {
                    dist[i][j] = dist[i][j].min(dist[i][j + 1] + 1);
                }
            }
        }
        dist
    }
}
