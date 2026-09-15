impl Solution {
    pub fn spiral_matrix_iii(rows: i32, cols: i32, rStart: i32, cStart: i32) -> Vec<Vec<i32>> {
        // The walk is a turtle: it runs east, south, west, north, east, ...
        // in turn, and every second turn the straight runs grow by one step
        // (1, 1, 2, 2, 3, 3, ...). A step that lands outside the grid is
        // still taken — the spiral reaches the far cells only by leaving
        // and re-entering — but only in-grid positions are recorded, and
        // once rows * cols of them are, the whole grid is visited and the
        // walk stops.
        let total = (rows * cols) as usize;
        let mut order: Vec<Vec<i32>> = Vec::with_capacity(total);
        order.push(vec![rStart, cStart]);
        let directions: [(i32, i32); 4] = [(0, 1), (1, 0), (0, -1), (-1, 0)]; // E, S, W, N
        let (mut r, mut c) = (rStart, cStart);
        let mut d = 0usize;
        let mut step = 1i32;
        while order.len() < total {
            for _ in 0..2 {
                let (dr, dc) = directions[d];
                for _ in 0..step {
                    r += dr;
                    c += dc;
                    if 0 <= r && r < rows && 0 <= c && c < cols {
                        order.push(vec![r, c]);
                    }
                }
                d = (d + 1) % 4;
            }
            step += 1;
        }
        order
    }
}
