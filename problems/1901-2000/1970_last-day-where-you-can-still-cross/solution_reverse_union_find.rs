impl Solution {
    pub fn latest_day_to_cross(row: i32, col: i32, cells: Vec<Vec<i32>>) -> i32 {
        let row = row as usize;
        let col = col as usize;
        let n = row * col;
        let top = n; // virtual sentinel: one node per shore
        let bottom = n + 1;
        let mut parent: Vec<usize> = (0..n + 2).collect();
        let mut size = vec![1usize; n + 2];
        let mut active = vec![vec![false; col]; row];

        fn find(parent: &mut [usize], mut x: usize) -> usize {
            // Path halving keeps the trees flat without a second pass.
            while parent[x] != x {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            x
        }

        fn unite(parent: &mut [usize], size: &mut [usize], a: usize, b: usize) {
            let (mut root_a, mut root_b) = (find(parent, a), find(parent, b));
            if root_a == root_b {
                return;
            }
            // Union by size: hang the smaller tree under the larger.
            if size[root_a] < size[root_b] {
                std::mem::swap(&mut root_a, &mut root_b);
            }
            parent[root_b] = root_a;
            size[root_a] += size[root_b];
        }

        // Walk the days backwards: one cell of land reappears per step, so
        // connectivity only grows. After absorbing cells[i] the grid state is
        // exactly "day i" (cells[:i] still flooded), so the first moment the
        // shores share a root, day i is the last crossable day.
        for i in (0..n).rev() {
            let r = (cells[i][0] - 1) as usize;
            let c = (cells[i][1] - 1) as usize;
            active[r][c] = true;
            let land = r * col + c;
            if r == 0 {
                unite(&mut parent, &mut size, land, top);
            }
            if r == row - 1 {
                unite(&mut parent, &mut size, land, bottom);
            }
            for (dr, dc) in [(1isize, 0isize), (-1, 0), (0, 1), (0, -1)] {
                let nr = r as isize + dr;
                let nc = c as isize + dc;
                if nr >= 0 && nr < row as isize && nc >= 0 && nc < col as isize && active[nr as usize][nc as usize] {
                    unite(&mut parent, &mut size, land, nr as usize * col + nc as usize);
                }
            }
            if find(&mut parent, top) == find(&mut parent, bottom) {
                return i as i32; // the shores just met: no later day can cross
            }
        }
        0 // unreachable: with row, col >= 2 even day 1 always crosses
    }
}
