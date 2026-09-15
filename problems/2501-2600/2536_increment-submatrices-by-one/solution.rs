impl Solution {
    pub fn range_add_queries(n: i32, queries: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let n = n as usize;
        // 2-D difference trick applied row by row.
        let mut diff = vec![vec![0i32; n + 1]; n];
        for q in &queries {
            let (r1, c1, r2, c2) = (q[0] as usize, q[1] as usize, q[2] as usize, q[3] as usize);
            for r in r1..=r2 {
                diff[r][c1] += 1;
                diff[r][c2 + 1] -= 1;
            }
        }
        let mut mat = vec![vec![0i32; n]; n];
        for r in 0..n {
            let mut running = 0;
            for c in 0..n {
                running += diff[r][c];
                mat[r][c] = running;
            }
        }
        mat
    }
}
