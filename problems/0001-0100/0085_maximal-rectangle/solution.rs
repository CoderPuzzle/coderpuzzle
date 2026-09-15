impl Solution {
    // Largest rectangle under one row's histogram: monotonic stack of
    // column indices with strictly increasing heights.
    fn largest_area(heights: &[i32]) -> i32 {
        let n = heights.len();
        let mut stack: Vec<usize> = Vec::new();
        let mut best: i32 = 0;
        for i in 0..=n {
            // h = 0 at i == n is a sentinel that flushes whatever remains
            // on the stack at the end of the row.
            let h = if i == n { 0 } else { heights[i] };
            // Pop while the top is strictly taller than h: those bars just
            // found their right boundary, the current index i. Equal
            // heights stay on the stack, so the earlier of two equal bars
            // accounts for the full run when finally popped.
            while let Some(&top) = stack.last() {
                if heights[top] <= h {
                    break;
                }
                let height = heights[top];
                stack.pop();
                // Left boundary is the new top (nearest strictly shorter
                // bar), or -1 when the rectangle reaches the start; the
                // width is i - left - 1, in i64 to guard the product.
                let left_i: i64 = stack.last().map(|&l| l as i64).unwrap_or(-1);
                let area = (height as i64) * ((i as i64) - left_i - 1);
                if area > best as i64 {
                    best = area as i32;
                }
            }
            stack.push(i);
        }
        best
    }

    pub fn maximal_rectangle(matrix: Vec<Vec<String>>) -> i32 {
        if matrix.is_empty() || matrix[0].is_empty() {
            return 0;
        }
        let rows = matrix.len();
        let cols = matrix[0].len();
        // Every all-ones rectangle has a bottom row, and that row sees a
        // histogram of consecutive-1 column heights; solving largest
        // rectangle once per row and taking the max covers them all.
        let mut heights = vec![0i32; cols];
        let mut best = 0;
        for r in 0..rows {
            // Fold the row in: '1' extends the run, '0' resets to 0 since a
            // rectangle cannot span a zero.
            for c in 0..cols {
                heights[c] = if matrix[r][c] == "1" { heights[c] + 1 } else { 0 };
            }
            let area = Solution::largest_area(&heights);
            if area > best {
                best = area;
            }
        }
        best
    }
}
