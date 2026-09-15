impl Solution {
    pub fn largest_square_area(bottomLeft: Vec<Vec<i32>>, topRight: Vec<Vec<i32>>) -> i64 {
        let mut best = 0_i64;
        let n = bottomLeft.len();
        for i in 0..n {
            for j in (i + 1)..n {
                let width = topRight[i][0].min(topRight[j][0]) - bottomLeft[i][0].max(bottomLeft[j][0]);
                let height = topRight[i][1].min(topRight[j][1]) - bottomLeft[i][1].max(bottomLeft[j][1]);
                if width > 0 && height > 0 {
                    let side = width.min(height) as i64;
                    best = best.max(side * side);
                }
            }
        }
        best
    }
}
