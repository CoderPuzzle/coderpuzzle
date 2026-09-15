use std::collections::VecDeque;

impl Solution {
    pub fn walls_and_gates(mut rooms: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let m = rooms.len();
        let n = rooms[0].len();
        const INF: i32 = 2147483647;
        // Invert the search: enqueue every gate at once and run one BFS
        // outward, rather than searching from each empty room.
        let mut queue: VecDeque<(usize, usize)> = VecDeque::new();
        for r in 0..m {
            for c in 0..n {
                if rooms[r][c] == 0 {
                    queue.push_back((r, c));
                }
            }
        }
        let dirs = [(1i32, 0i32), (-1, 0), (0, 1), (0, -1)];
        let mut dist: i32 = 0;
        while !queue.is_empty() {
            // Expand one whole layer per step: every distance-d cell is
            // found before any d+1 cell is labeled, which is what keeps
            // distances minimal (first reach = shortest path from a gate).
            dist += 1;
            for _ in 0..queue.len() {
                let (r, c) = queue.pop_front().unwrap();
                for (dr, dc) in dirs {
                    let nr = r as i32 + dr;
                    let nc = c as i32 + dc;
                    if nr >= 0 && (nr as usize) < m && nc >= 0 && (nc as usize) < n {
                        let (ur, uc) = (nr as usize, nc as usize);
                        // Still INF means unvisited; writing the distance
                        // doubles as the visited mark, and walls/gates never
                        // match INF so they are never entered or overwritten.
                        if rooms[ur][uc] == INF {
                            rooms[ur][uc] = dist;
                            queue.push_back((ur, uc));
                        }
                    }
                }
            }
        }
        rooms
    }
}
