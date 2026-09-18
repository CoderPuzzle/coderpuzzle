use std::collections::{HashMap, HashSet, VecDeque};

impl Solution {
    pub fn findShortestPath(maze: &mut GridMaster) -> i32 {
        let dirs = ["U", "D", "L", "R"];
        let dr: [i32; 4] = [-1, 1, 0, 0];
        let dc: [i32; 4] = [0, 0, -1, 1];
        let back = ["D", "U", "R", "L"]; // opposite of dirs[i]

        let key = |r: i32, c: i32| -> i64 { ((r + 512) as i64) * 1024 + (c + 512) as i64 };

        let mut seen: HashSet<i64> = HashSet::new();
        seen.insert(key(0, 0));
        let mut target_key: i64 = if maze.is_target() { key(0, 0) } else { -1 };

        // Iterative DFS keeps the walker physically on the DFS tree: step
        // into a child when pushing, step back when popping. Each reachable
        // cell is entered exactly once and probed with is_target.
        let mut stack: Vec<(i32, i32, usize)> = vec![(0, 0, 0)]; // r, c, next direction index
        let mut parent_dirs: Vec<i32> = vec![-1];
        while let Some(&(r, c, mut idx)) = stack.last() {
            let mut pushed = false;
            while idx < 4 {
                let (nr, nc) = (r + dr[idx], c + dc[idx]);
                let direction = dirs[idx];
                idx += 1;
                if maze.can_move(direction) && seen.insert(key(nr, nc)) {
                    maze.step(direction);
                    if maze.is_target() {
                        target_key = key(nr, nc);
                    }
                    let top = stack.len() - 1;
                    stack[top].2 = idx;
                    stack.push((nr, nc, 0));
                    parent_dirs.push(idx as i32 - 1);
                    pushed = true;
                    break;
                }
            }
            if !pushed {
                stack.pop();
                let parent_dir = parent_dirs.pop().unwrap();
                if !stack.is_empty() && parent_dir >= 0 {
                    maze.step(back[parent_dir as usize]);
                }
            }
        }

        if target_key < 0 {
            return -1;
        }
        // Unit edge weights: plain BFS over the discovered map.
        let mut dist: HashMap<i64, i32> = HashMap::new();
        dist.insert(key(0, 0), 0);
        let mut queue: VecDeque<(i32, i32)> = VecDeque::new();
        queue.push_back((0, 0));
        while let Some((r, c)) = queue.pop_front() {
            let d = dist[&key(r, c)];
            for i in 0..4 {
                let (nr, nc) = (r + dr[i], c + dc[i]);
                let nk = key(nr, nc);
                if seen.contains(&nk) && !dist.contains_key(&nk) {
                    dist.insert(nk, d + 1);
                    queue.push_back((nr, nc));
                }
            }
        }
        dist[&target_key]
    }
}
