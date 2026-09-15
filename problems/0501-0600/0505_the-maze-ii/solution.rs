use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn shortest_distance(maze: Vec<Vec<i32>>, start: Vec<i32>, destination: Vec<i32>) -> i32 {
        let m = maze.len() as i32;
        let n = maze[0].len() as i32;
        let mut dist = vec![vec![-1i32; n as usize]; m as usize];
        let mut heap: BinaryHeap<Reverse<(i32, i32, i32)>> = BinaryHeap::new();
        dist[start[0] as usize][start[1] as usize] = 0;
        heap.push(Reverse((0, start[0], start[1])));
        let dirs: [(i32, i32); 4] = [(1, 0), (-1, 0), (0, 1), (0, -1)];
        // Dijkstra over stopping cells — positions where the ball halts
        // against a wall/border. Roll distances vary, so BFS won't do.
        while let Some(Reverse((d, r, c))) = heap.pop() {
            // Dijkstra settles cells in distance order: destination popped
            // => its distance is final.
            if r == destination[0] && c == destination[1] {
                return d;
            }
            // Stale heap entry (cell was already relaxed lower): skip.
            if d > dist[r as usize][c as usize] {
                continue;
            }
            for (dr, dc) in dirs {
                // Roll step by step until the next cell is a wall or out
                // of bounds; the landing cell is the neighbor, steps the
                // edge weight. Passing over a cell doesn't create a node —
                // only stopping on it does.
                let (mut nr, mut nc, mut steps) = (r, c, 0);
                while nr + dr >= 0
                    && nr + dr < m
                    && nc + dc >= 0
                    && nc + dc < n
                    && maze[(nr + dr) as usize][(nc + dc) as usize] == 0
                {
                    nr += dr;
                    nc += dc;
                    steps += 1;
                }
                if steps > 0 {
                    let nd = d + steps;
                    let cell = &mut dist[nr as usize][nc as usize];
                    // Relax only when the roll improves the landing cell.
                    if *cell == -1 || nd < *cell {
                        *cell = nd;
                        heap.push(Reverse((nd, nr, nc)));
                    }
                }
            }
        }
        // Heap exhausted: the ball can never stop on the destination.
        -1
    }
}
