use std::collections::HashMap;

impl Solution {
    pub fn rectangle_area(rectangles: Vec<Vec<i32>>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        if rectangles.is_empty() {
            return 0;
        }
        // Coordinate compression: with at most 2R distinct values per
        // axis, cell boundaries are exactly the rectangle edges, so
        // coverage is constant within each cell.
        let mut xs_set: Vec<i64> = Vec::new();
        let mut ys_set: Vec<i64> = Vec::new();
        let mut push_unique = |v: &mut Vec<i64>, x: i64| {
            if !v.contains(&x) {
                v.push(x);
            }
        };
        for rect in &rectangles {
            push_unique(&mut xs_set, rect[0] as i64);
            push_unique(&mut xs_set, rect[2] as i64);
            push_unique(&mut ys_set, rect[1] as i64);
            push_unique(&mut ys_set, rect[3] as i64);
        }
        xs_set.sort_unstable();
        ys_set.sort_unstable();
        let xs = xs_set;
        let ys = ys_set;
        let mut x_index: HashMap<i64, usize> = HashMap::new();
        for (i, &x) in xs.iter().enumerate() {
            x_index.insert(x, i);
        }
        let mut y_index: HashMap<i64, usize> = HashMap::new();
        for (i, &y) in ys.iter().enumerate() {
            y_index.insert(y, i);
        }
        let nx = xs.len() - 1;
        let ny = ys.len() - 1;
        let mut grid = vec![false; nx * ny];
        // Mark the half-open compressed range: adjacent rectangles
        // share edge cells without overlap or gaps, and idempotent
        // marking counts overlaps once.
        for rect in &rectangles {
            let x1 = x_index[&(rect[0] as i64)];
            let x2 = x_index[&(rect[2] as i64)];
            let y1 = y_index[&(rect[1] as i64)];
            let y2 = y_index[&(rect[3] as i64)];
            for i in x1..x2 {
                for j in y1..y2 {
                    grid[i * ny + j] = true;
                }
            }
        }
        // Sum the real areas of marked cells, reducing at each step.
        let mut total: i64 = 0;
        for i in 0..nx {
            for j in 0..ny {
                if grid[i * ny + j] {
                    let dx = (xs[i + 1] - xs[i]) % MOD;
                    let dy = (ys[j + 1] - ys[j]) % MOD;
                    total = (total + dx * dy % MOD) % MOD;
                }
            }
        }
        total as i32
    }
}
