impl Solution {
    // The three projections never interact: the top view counts nonzero
    // cells, the other two are silhouettes of row and column maxima. One
    // row-major sweep banks the footprint and each row's tallest tower; a
    // second sweep collects the column maxima.
    pub fn projection_area(grid: Vec<Vec<i32>>) -> i32 {
        let n = grid.len();
        let mut total: i32 = 0;
        for row in &grid {
            let mut tallest = 0;
            for &v in row {
                if v != 0 {
                    total += 1;
                }
                if v > tallest {
                    tallest = v;
                }
            }
            total += tallest;
        }
        for j in 0..n {
            let mut tallest = 0;
            for row in &grid {
                if row[j] > tallest {
                    tallest = row[j];
                }
            }
            total += tallest;
        }
        total
    }
}
