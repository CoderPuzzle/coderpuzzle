use std::collections::HashSet;

const GRID_SIZE: i64 = 1_000_000;

impl Solution {
    pub fn is_escape_possible(blocked: Vec<Vec<i32>>, source: Vec<i32>, target: Vec<i32>) -> bool {
        let blocked_set: HashSet<i64> = blocked.iter().map(|c| Self::key(c[0], c[1])).collect();
        // With n blocked cells, the largest pocket they can wall off is the
        // triangular staircase in a grid corner: n * (n - 1) / 2 cells. If a
        // flood-fill from an endpoint ever visits more cells than that, the
        // endpoint cannot be trapped, so the fill can stop early instead of
        // exploring the (unmaterializable) rest of the grid.
        let n = blocked_set.len() as i64;
        let max_enclosed_area = n * (n - 1) / 2;

        // source cannot reach past its own pocket boundary AND target cannot
        // reach past its own pocket boundary -- both must escape their local
        // neighborhood for a path to exist between them.
        Self::can_escape_locally(&source, &target, &blocked_set, max_enclosed_area)
            && Self::can_escape_locally(&target, &source, &blocked_set, max_enclosed_area)
    }

    fn key(x: i32, y: i32) -> i64 {
        x as i64 * GRID_SIZE + y as i64
    }

    fn can_escape_locally(start: &[i32], goal: &[i32], blocked_set: &HashSet<i64>, max_enclosed_area: i64) -> bool {
        let mut visited: HashSet<i64> = HashSet::new();
        visited.insert(Self::key(start[0], start[1]));
        let mut stack: Vec<(i32, i32)> = vec![(start[0], start[1])];
        let directions: [(i32, i32); 4] = [(1, 0), (-1, 0), (0, 1), (0, -1)];

        while let Some((x, y)) = stack.pop() {
            if visited.len() as i64 > max_enclosed_area {
                return true;
            }
            for (dx, dy) in directions {
                let nx = x + dx;
                let ny = y + dy;
                if nx < 0 || nx >= GRID_SIZE as i32 || ny < 0 || ny >= GRID_SIZE as i32 {
                    continue;
                }
                let k = Self::key(nx, ny);
                if blocked_set.contains(&k) || visited.contains(&k) {
                    continue;
                }
                if nx == goal[0] && ny == goal[1] {
                    return true;
                }
                visited.insert(k);
                stack.push((nx, ny));
            }
        }
        false
    }
}
