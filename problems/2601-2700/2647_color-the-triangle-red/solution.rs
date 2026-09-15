impl Solution {
    pub fn color_red(n: i32) -> Vec<Vec<i32>> {
        // Period-4 construction, four rows at a time going bottom up. The
        // leftover tip rows (tipSize = n % 4) are seeded at the top, then
        // everything below tiles into full bands of four rows: each band's
        // top row takes the leftmost triangle, its second row takes every
        // odd column except the first, its third row a single column-2
        // triangle, and its bottom row every odd column. Under the >= 2
        // red-neighbors rule each band floods by itself, so the whole
        // triangle ends red using the minimum number of initial seeds.
        let n = n as usize;
        let mut ans: Vec<Vec<i32>> = Vec::new();
        let tip_size = n % 4;
        if tip_size >= 1 {
            ans.push(vec![1, 1]);
        }
        for r in 2..=tip_size {
            ans.push(vec![r as i32, 1]);
            ans.push(vec![r as i32, (2 * r - 1) as i32]);
        }
        let mut i = tip_size + 1;
        while i < n {
            // Top row of this band.
            ans.push(vec![i as i32, 1]);
            // Second row: odd columns 3 .. 2i+1.
            for j in 1..=i {
                ans.push(vec![(i + 1) as i32, (2 * j + 1) as i32]);
            }
            // Third row: single down-pointing triangle.
            ans.push(vec![(i + 2) as i32, 2]);
            // Bottom row: every odd column.
            for j in 0..=(i + 2) {
                ans.push(vec![(i + 3) as i32, (2 * j + 1) as i32]);
            }
            i += 4;
        }
        ans
    }
}
