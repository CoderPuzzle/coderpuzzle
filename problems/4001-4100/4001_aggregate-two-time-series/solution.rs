impl Solution {
    pub fn aggregate_time_series(series1: Vec<Vec<i32>>, series2: Vec<Vec<i32>>) -> Vec<Vec<i64>> {
        let mut reversed: Vec<Vec<i64>> = Vec::with_capacity(series1.len() + series2.len());
        let mut i = series1.len();
        let mut j = series2.len();
        let mut value1: i64 = 0;
        let mut value2: i64 = 0;
        // Sweep the union of timestamps from right to left. Each running
        // value is the last value its series contributed, which for every
        // timestamp still ahead of the cursor is exactly that series' next
        // available value; a series not yet reached contributes 0. Sums
        // reach 2e9, so values and results are held in i64.
        while i > 0 || j > 0 {
            let ts;
            if j == 0 || (i > 0 && series1[i - 1][0] >= series2[j - 1][0]) {
                ts = series1[i - 1][0] as i64;
                value1 = series1[i - 1][1] as i64;
                i -= 1;
                if j > 0 && series2[j - 1][0] as i64 == ts {
                    value2 = series2[j - 1][1] as i64;
                    j -= 1;
                }
            } else {
                ts = series2[j - 1][0] as i64;
                value2 = series2[j - 1][1] as i64;
                j -= 1;
            }
            reversed.push(vec![ts, value1 + value2]);
        }
        reversed.reverse();
        reversed
    }
}
