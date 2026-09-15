impl Solution {
    // Each layer is peeled into a ring walked counter-clockwise from its
    // top-left corner. Rotating the layer k times moves every element k steps
    // along that walk, which is one right-rotation of the ring by
    // k % ring_len; the ring is then written back along the same walk.
    pub fn rotate_grid(grid: Vec<Vec<i32>>, k: i32) -> Vec<Vec<i32>> {
        let (m, n) = (grid.len(), grid[0].len());
        let mut out = vec![vec![0i32; n]; m];
        for l in 0..m.min(n) / 2 {
            let (top, left, bottom, right) = (l, l, m - 1 - l, n - 1 - l);
            let mut pos: Vec<(usize, usize)> = Vec::new();
            for r in top..=bottom {
                pos.push((r, left));
            }
            for c in left + 1..=right {
                pos.push((bottom, c));
            }
            for r in (top..bottom).rev() {
                pos.push((r, right));
            }
            for c in (left + 1..right).rev() {
                pos.push((top, c));
            }
            let len = pos.len();
            let s = (k as usize) % len;
            for i in 0..len {
                let (fr, fc) = pos[(i + len - s) % len];
                let (tr, tc) = pos[i];
                out[tr][tc] = grid[fr][fc];
            }
        }
        out
    }
}
