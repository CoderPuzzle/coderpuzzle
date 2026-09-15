impl Solution {
    pub fn max_product_path(grid: Vec<Vec<i32>>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let m = grid.len();
        let n = grid[0].len();
        let mut max_row: Vec<i64> = vec![0; n];
        let mut min_row: Vec<i64> = vec![0; n];
        max_row[0] = grid[0][0] as i64;
        min_row[0] = max_row[0];
        for j in 1..n {
            let value = max_row[j - 1] * grid[0][j] as i64;
            max_row[j] = value;
            min_row[j] = value;
        }

        for i in 1..m {
            let mut new_max: Vec<i64> = vec![0; n];
            let mut new_min: Vec<i64> = vec![0; n];
            let value = max_row[0] * grid[i][0] as i64;
            new_max[0] = value;
            new_min[0] = value;
            for j in 1..n {
                let cur = grid[i][j] as i64;
                let a = max_row[j] * cur;
                let b = min_row[j] * cur;
                let c = new_max[j - 1] * cur;
                let d = new_min[j - 1] * cur;
                new_max[j] = a.max(b).max(c.max(d));
                new_min[j] = a.min(b).min(c.min(d));
            }
            max_row = new_max;
            min_row = new_min;
        }

        let best = max_row[n - 1];
        if best < 0 {
            -1
        } else {
            (best % MOD) as i32
        }
    }
}
