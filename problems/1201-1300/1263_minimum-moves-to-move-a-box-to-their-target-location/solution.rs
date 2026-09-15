use std::collections::{HashSet, VecDeque};

impl Solution {
    pub fn min_push_box(grid: Vec<Vec<String>>) -> i32 {
        let m = grid.len();
        let n = grid[0].len();
        let mut box_pos = (0usize, 0usize);
        let mut player = (0usize, 0usize);
        let mut target = (0usize, 0usize);
        for r in 0..m {
            for c in 0..n {
                let cell = grid[r][c].as_str();
                match cell {
                    "B" => box_pos = (r, c),
                    "S" => player = (r, c),
                    "T" => target = (r, c),
                    _ => {}
                }
            }
        }
        // Bounds-checked: neighbour cells probed here may sit off-grid.
        let (m_i, n_i) = (m as isize, n as isize);
        let free = |r: usize, c: usize| -> bool {
            let (ri, ci) = (r as isize, c as isize);
            ri >= 0 && ri < m_i && ci >= 0 && ci < n_i && grid[r][c] != "#"
        };
        // Flood the player's reachable floor with the box as an obstacle.
        // Uses signed coords so neighbour math stays simple.
        let reachable = |br: isize, bc: isize, sr: isize, sc: isize, seen: &mut Vec<Vec<bool>>| {
            let (m_i, n_i) = (m as isize, n as isize);
            let mut queue = VecDeque::new();
            seen[sr as usize][sc as usize] = true;
            queue.push_back((sr, sc));
            while let Some((r, c)) = queue.pop_front() {
                for (dr, dc) in [(1isize, 0isize), (-1, 0), (0, 1), (0, -1)] {
                    let (nr, nc) = (r + dr, c + dc);
                    if nr < 0 || nr >= m_i || nc < 0 || nc >= n_i {
                        continue;
                    }
                    let (ur, uc) = (nr as usize, nc as usize);
                    if (nr == br && nc == bc) || seen[ur][uc] || grid[ur][uc] == "#" {
                        continue;
                    }
                    seen[ur][uc] = true;
                    queue.push_back((nr, nc));
                }
            }
        };

        // State: (box cell, side of the player). After a push along
        // DELTAS[i] the player ends up standing on side i of the new box
        // cell. Each edge is one push, so BFS yields minimal pushes.
        const DELTAS: [(isize, isize); 4] = [(0, -1), (0, 1), (-1, 0), (1, 0)];
        let key = |br: usize, bc: usize, side: usize| -> u64 { (((br * n + bc) as u64) << 2) | side as u64 };
        let mut visited: HashSet<u64> = HashSet::new();
        let mut queue: VecDeque<(usize, usize, usize, i32)> = VecDeque::new();
        let mut around = vec![vec![false; n]; m];
        reachable(
            box_pos.0 as isize,
            box_pos.1 as isize,
            player.0 as isize,
            player.1 as isize,
            &mut around,
        );
        for i in 0..4 {
            let stand = (
                (box_pos.0 as isize + DELTAS[i].0) as usize,
                (box_pos.1 as isize + DELTAS[i].1) as usize,
            );
            let dest = (
                (box_pos.0 as isize - DELTAS[i].0) as usize,
                (box_pos.1 as isize - DELTAS[i].1) as usize,
            );
            if !free(stand.0, stand.1) || !free(dest.0, dest.1) {
                continue;
            }
            if !around[stand.0][stand.1] {
                continue;
            }
            visited.insert(key(dest.0, dest.1, i));
            queue.push_back((dest.0, dest.1, i, 1));
        }
        while let Some((br, bc, side, pushes)) = queue.pop_front() {
            if (br, bc) == target {
                return pushes;
            }
            let mut seen = vec![vec![false; n]; m];
            reachable(
                br as isize,
                bc as isize,
                br as isize + DELTAS[side].0,
                bc as isize + DELTAS[side].1,
                &mut seen,
            );
            for i in 0..4 {
                let stand = (
                    (br as isize + DELTAS[i].0) as usize,
                    (bc as isize + DELTAS[i].1) as usize,
                );
                let dest = (
                    (br as isize - DELTAS[i].0) as usize,
                    (bc as isize - DELTAS[i].1) as usize,
                );
                if !free(stand.0, stand.1) || !free(dest.0, dest.1) {
                    continue;
                }
                if !seen[stand.0][stand.1] {
                    continue;
                }
                let k = key(dest.0, dest.1, i);
                if visited.contains(&k) {
                    continue;
                }
                visited.insert(k);
                queue.push_back((dest.0, dest.1, i, pushes + 1));
            }
        }
        -1
    }
}
