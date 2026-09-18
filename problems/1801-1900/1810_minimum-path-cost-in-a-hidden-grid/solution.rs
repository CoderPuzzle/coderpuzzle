use std::cmp::Reverse;
use std::collections::{BinaryHeap, HashMap};

impl Solution {
    pub fn findMinimumPath(maze: &mut GridMaster) -> i32 {
        let dirs = ["U", "D", "L", "R"];
        let dr: [i32; 4] = [-1, 1, 0, 0];
        let dc: [i32; 4] = [0, 0, -1, 1];
        let back = ["D", "U", "R", "L"]; // opposite of dirs[i]

        let key = |r: i32, c: i32| -> i64 { ((r + 128) as i64) * 256 + (c + 128) as i64 };

        let mut cost: HashMap<i64, i32> = HashMap::new();
        cost.insert(key(0, 0), 0);
        let mut found_target = maze.is_target();
        let mut goal = (0i32, 0i32);

        // Iterative DFS keeps the walker physically on the DFS tree: step
        // into a child when pushing, step back when popping. Each discovered
        // cell records the toll step() reported on entering it.
        let mut stack: Vec<(i32, i32, usize)> = vec![(0, 0, 0)]; // r, c, next direction index
        let mut parent_dirs: Vec<i32> = vec![-1];
        while let Some(&(r, c, mut idx)) = stack.last() {
            let mut pushed = false;
            while idx < 4 {
                let (nr, nc) = (r + dr[idx], c + dc[idx]);
                let direction = dirs[idx];
                idx += 1;
                if maze.can_move(direction) && !cost.contains_key(&key(nr, nc)) {
                    let toll = maze.step(direction);
                    cost.insert(key(nr, nc), toll);
                    if maze.is_target() {
                        found_target = true;
                        goal = (nr, nc);
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

        if !found_target {
            return -1;
        }
        // Dijkstra over the surveyed tolls: settle cheapest-first, skip
        // stale heap entries, relax neighbours with the entered cell's toll.
        let mut dist: HashMap<i64, i64> = HashMap::new();
        let mut heap: BinaryHeap<Reverse<(i64, i32, i32)>> = BinaryHeap::new();
        dist.insert(key(0, 0), 0);
        heap.push(Reverse((0, 0, 0)));
        while let Some(Reverse((du, r, c))) = heap.pop() {
            if du > *dist.get(&key(r, c)).unwrap_or(&i64::MAX) {
                continue;
            }
            for i in 0..4 {
                let (nr, nc) = (r + dr[i], c + dc[i]);
                let nk = key(nr, nc);
                if let Some(&step) = cost.get(&nk) {
                    let nd = du + step as i64;
                    if nd < *dist.get(&nk).unwrap_or(&i64::MAX) {
                        dist.insert(nk, nd);
                        heap.push(Reverse((nd, nr, nc)));
                    }
                }
            }
        }
        match dist.get(&key(goal.0, goal.1)) {
            Some(&answer) => answer as i32,
            None => -1,
        }
    }
}
