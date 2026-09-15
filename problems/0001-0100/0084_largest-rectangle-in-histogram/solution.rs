impl Solution {
    pub fn largest_rectangle_area(heights: Vec<i32>) -> i32 {
        let n = heights.len();
        // Stack of indices whose heights are strictly increasing. For any
        // bar, the widest full-height rectangle spans the nearest strictly
        // shorter bar on each side; the scan finds both boundaries
        // implicitly. Each index is pushed once and popped at most once,
        // so the inner loop keeps the whole pass linear.
        let mut stack: Vec<usize> = Vec::new();
        let mut best: i32 = 0;
        for i in 0..=n {
            // h = 0 at i == n is a sentinel: shorter than everything, it
            // flushes every remaining bar without adding area itself.
            let h = if i == n { 0 } else { heights[i] };
            // Pop while the top is strictly taller than h: those bars just
            // found their right boundary, the current index i. Equal
            // heights stay on the stack, so an equal run still computes
            // its full width when finally flushed.
            while let Some(&top) = stack.last() {
                if heights[top] <= h {
                    break;
                }
                let height = heights[top];
                stack.pop();
                // Left boundary is the new top (nearest still strictly
                // shorter bar), or -1 when the rectangle reaches the start.
                // Width is i - left - 1; i64 math guards the product.
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
}
