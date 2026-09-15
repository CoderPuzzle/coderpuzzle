impl Solution {
    pub fn largest_submatrix(matrix: Vec<Vec<i32>>) -> i32 {
        let m = matrix.len();
        if m == 0 {
            return 0;
        }
        let n = matrix[0].len();
        let mut heights = vec![0i32; n];
        let mut best = 0i32;
        for row in &matrix {
            // heights[j] = run of consecutive ones ending at this row.
            for j in 0..n {
                heights[j] = if row[j] == 1 { heights[j] + 1 } else { 0 };
            }
            // Columns may be rearranged, so only the multiset of heights
            // matters; descending order puts the (i+1)-th tallest run at i.
            let mut ordered = heights.clone();
            ordered.sort_by(|a, b| b.cmp(a));
            // The top i+1 columns all reach height h, and the rearrangement
            // places them side by side — width i+1 is real.
            for (i, &h) in ordered.iter().enumerate() {
                // Descending order: everything after a zero is zero too.
                if h == 0 {
                    break;
                }
                let area = h * (i as i32 + 1);
                if area > best {
                    best = area;
                }
            }
        }
        best
    }
}
