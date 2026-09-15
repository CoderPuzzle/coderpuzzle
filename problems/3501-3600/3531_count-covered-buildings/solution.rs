impl Solution {
    pub fn count_covered_buildings(n: i32, buildings: Vec<Vec<i32>>) -> i32 {
        let n = n as usize;
        // Per x-line: extreme y values; per y-line: extreme x values. A
        // building is covered exactly when it is strictly inside both.
        let mut row_min_y = vec![n as i32 + 1; n + 1];
        let mut row_max_y = vec![0i32; n + 1];
        let mut col_min_x = vec![n as i32 + 1; n + 1];
        let mut col_max_x = vec![0i32; n + 1];
        for b in &buildings {
            let (x, y) = (b[0], b[1]);
            row_min_y[x as usize] = row_min_y[x as usize].min(y);
            row_max_y[x as usize] = row_max_y[x as usize].max(y);
            col_min_x[y as usize] = col_min_x[y as usize].min(x);
            col_max_x[y as usize] = col_max_x[y as usize].max(x);
        }
        buildings
            .iter()
            .filter(|b| {
                let (x, y) = (b[0], b[1]);
                row_min_y[x as usize] < y
                    && y < row_max_y[x as usize]
                    && col_min_x[y as usize] < x
                    && x < col_max_x[y as usize]
            })
            .count() as i32
    }
}
