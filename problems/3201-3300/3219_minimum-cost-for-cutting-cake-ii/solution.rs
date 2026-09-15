impl Solution {
    pub fn minimum_cost(m: i32, n: i32, horizontalCut: Vec<i32>, verticalCut: Vec<i32>) -> i64 {
        // Each line is priced once per perpendicular strip alive when it is
        // cut, and swapping two adjacent cuts of different families changes
        // the total by (cheaper - more expensive), so an optimal schedule
        // always takes the globally most expensive remaining line. Merge
        // both arrays largest-first, charging each horizontal cut times the
        // current vertical strip count and vice versa. Totals reach about
        // 2 * 10^13, so everything widens to i64.
        let mut horizontalCut = horizontalCut;
        horizontalCut.sort_unstable();
        let mut verticalCut = verticalCut;
        verticalCut.sort_unstable();
        let mut total: i64 = 0;
        let mut row_pieces: i64 = 1;
        let mut col_pieces: i64 = 1;
        let mut i = m - 2;
        let mut j = n - 2;
        while i >= 0 || j >= 0 {
            if j < 0 || (i >= 0 && horizontalCut[i as usize] >= verticalCut[j as usize]) {
                total += horizontalCut[i as usize] as i64 * col_pieces;
                i -= 1;
                row_pieces += 1;
            } else {
                total += verticalCut[j as usize] as i64 * row_pieces;
                j -= 1;
                col_pieces += 1;
            }
        }
        total
    }
}
