impl Solution {
    pub fn min_cost(grid: Vec<Vec<i32>>, k: i32) -> i32 {
        let m = grid.len();
        let n = grid[0].len();
        let inf = i64::MAX / 4;
        // Layer 0 is the plain right/down minimum path sum: every move pays
        // its destination cell, and standing on the start costs nothing.
        let mut d = vec![vec![inf; n]; m];
        d[0][0] = 0;
        for i in 0..m {
            for j in 0..n {
                if i == 0 && j == 0 {
                    continue;
                }
                let mut best = if i > 0 { d[i - 1][j] } else { inf };
                if j > 0 && d[i][j - 1] < best {
                    best = d[i][j - 1];
                }
                d[i][j] = best + grid[i][j] as i64;
            }
        }
        // Each further layer opens with one teleport: land anywhere whose
        // value is at least mine, at the previous layer's price of that
        // launch cell. Cells sorted by value descending turn the scan into
        // a running prefix minimum; ties share one prefix because the test
        // is >=.
        let mut cells: Vec<(usize, usize)> = Vec::with_capacity(m * n);
        for i in 0..m {
            for j in 0..n {
                cells.push((i, j));
            }
        }
        cells.sort_by(|a, b| grid[b.0][b.1].cmp(&grid[a.0][a.1]));
        let mut answer = d[m - 1][n - 1];
        for _ in 0..k {
            let mut seed = vec![vec![inf; n]; m];
            let mut run = inf;
            let mut p = 0usize;
            for &(i, j) in &cells {
                while p < cells.len() && grid[cells[p].0][cells[p].1] >= grid[i][j] {
                    let (si, sj) = cells[p];
                    if d[si][sj] < run {
                        run = d[si][sj];
                    }
                    p += 1;
                }
                seed[i][j] = run;
            }
            // Then ordinary right/down moves carry each landing spot through
            // the rest of the layer, as in the plain path-sum pass above.
            for i in 0..m {
                for j in 0..n {
                    let mut best = seed[i][j];
                    let g = grid[i][j] as i64;
                    if i > 0 && seed[i - 1][j] + g < best {
                        best = seed[i - 1][j] + g;
                    }
                    if j > 0 && seed[i][j - 1] + g < best {
                        best = seed[i][j - 1] + g;
                    }
                    seed[i][j] = best;
                }
            }
            d = seed;
            if d[m - 1][n - 1] < answer {
                answer = d[m - 1][n - 1];
            }
        }
        answer as i32
    }
}
