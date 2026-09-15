// At most 10 points, so the set of covered points fits in a bitmask:
// dp[covered] = fewest lines covering exactly that subset. In each state
// the lowest uncovered point i is covered by the next line, so trying i
// alone and every line through i and one more uncovered point j exhausts
// every option.
impl Solution {
    pub fn minimum_lines(points: Vec<Vec<i32>>) -> i32 {
        let n = points.len();
        let full = (1 << n) - 1;
        // lineMask[i][j] = all points on the straight line through i and j;
        // the cross-product comparison tests collinearity on integers, and
        // coordinates bounded by 100 keep every product well inside i32.
        let mut line_mask = vec![vec![0usize; n]; n];
        for i in 0..n {
            for j in 0..n {
                if i == j {
                    continue;
                }
                let dx1 = points[j][0] - points[i][0];
                let dy1 = points[j][1] - points[i][1];
                let mut mask = (1 << i) | (1 << j);
                for k in 0..n {
                    let dx2 = points[k][0] - points[i][0];
                    let dy2 = points[k][1] - points[i][1];
                    if k != i && k != j && dx1 * dy2 == dy1 * dx2 {
                        mask |= 1 << k;
                    }
                }
                line_mask[i][j] = mask;
            }
        }
        let unreachable = n + 1;
        let mut dp = vec![unreachable; full + 1];
        dp[0] = 0;
        for covered in 0..full {
            if dp[covered] == unreachable {
                continue;
            }
            let mut i = 0;
            while covered & (1 << i) != 0 {
                i += 1;
            }
            let mut nxt = covered | (1 << i);
            if dp[covered] + 1 < dp[nxt] {
                dp[nxt] = dp[covered] + 1;
            }
            for j in 0..n {
                if j == i || covered & (1 << j) != 0 {
                    continue;
                }
                nxt = covered | line_mask[i][j];
                if dp[covered] + 1 < dp[nxt] {
                    dp[nxt] = dp[covered] + 1;
                }
            }
        }
        dp[full] as i32
    }
}
