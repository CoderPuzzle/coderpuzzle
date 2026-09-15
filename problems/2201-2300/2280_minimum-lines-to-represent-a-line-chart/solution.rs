impl Solution {
    pub fn minimum_lines(stockPrices: Vec<Vec<i32>>) -> i32 {
        let mut points = stockPrices;
        points.sort();
        let n = points.len();
        if n <= 2 {
            return (n - 1) as i32;
        }
        let mut lines = 1;
        for i in 2..n {
            // Differences stay under 1e9, but their products approach 1e18,
            // so widen to i64 before the cross-multiplied slope test.
            let x1 = points[i - 2][0] as i64;
            let y1 = points[i - 2][1] as i64;
            let x2 = points[i - 1][0] as i64;
            let y2 = points[i - 1][1] as i64;
            let x3 = points[i][0] as i64;
            let y3 = points[i][1] as i64;
            if (x2 - x1) * (y3 - y2) != (x3 - x2) * (y2 - y1) {
                lines += 1;
            }
        }
        lines
    }
}
