impl Solution {
    pub fn maximum_minimum_path(grid: Vec<Vec<i32>>) -> i32 {
        let rows = grid.len();
        let cols = grid[0].len();
        // Kruskal-style admission: switch cells on biggest-first and stop the
        // moment the two corners join one admitted component -- the value of
        // the cell admitted last is the widest bottleneck any walk can hold.
        let mut cells: Vec<(i32, usize, usize)> = Vec::with_capacity(rows * cols);
        for r in 0..rows {
            for c in 0..cols {
                cells.push((grid[r][c], r, c));
            }
        }
        // Falling order of value: the biggest cells are admitted first.
        cells.sort_unstable_by(|a, b| b.0.cmp(&a.0));
        // parent[i] is usize::MAX while cell i is unadmitted, else its
        // union-find parent. An unadmitted cell is its own isolated root;
        // path halving inside find keeps the forest nearly flat.
        let mut parent = vec![usize::MAX; rows * cols];
        fn find(parent: &mut [usize], i: usize) -> usize {
            if parent[i] == usize::MAX {
                return i;
            }
            let mut i = i;
            while parent[i] != i {
                parent[i] = parent[parent[i]];
                i = parent[i];
            }
            i
        }
        let dirs: [(isize, isize); 4] = [(1, 0), (-1, 0), (0, 1), (0, -1)];
        for &(value, r, c) in &cells {
            let idx = r * cols + c;
            // Admit the cell: it becomes its own root, then merges with every
            // already-admitted neighbour.
            parent[idx] = idx;
            for (dr, dc) in dirs {
                let nr = r as isize + dr;
                let nc = c as isize + dc;
                if nr >= 0 && nr < rows as isize && nc >= 0 && nc < cols as isize {
                    let (nr, nc) = (nr as usize, nc as usize);
                    let nidx = nr * cols + nc;
                    if parent[nidx] != usize::MAX {
                        let ra = find(&mut parent, idx);
                        let rb = find(&mut parent, nidx);
                        if ra != rb {
                            parent[ra] = rb;
                        }
                    }
                }
            }
            let start_root = find(&mut parent, 0);
            let goal_root = find(&mut parent, rows * cols - 1);
            if start_root == goal_root {
                return value;
            }
        }
        // The full grid is connected, so the loop always returns inside.
        0
    }
}
