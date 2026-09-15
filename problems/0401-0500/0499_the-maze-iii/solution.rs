use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn find_shortest_way(maze: Vec<Vec<i32>>, ball: Vec<i32>, hole: Vec<i32>) -> String {
        let m = maze.len() as i32;
        let n = maze[0].len() as i32;
        let (hr, hc) = (hole[0], hole[1]);
        let mut dist = vec![vec![-1i32; n as usize]; m as usize];
        let mut path: Vec<Vec<String>> = vec![vec![String::new(); n as usize]; m as usize];
        // Reverse turns BinaryHeap's max-heap into a min-heap of
        // (distance, instructions, r, c) — tuple order compares distance
        // first, then the instruction string.
        let mut heap: BinaryHeap<Reverse<(i32, String, i32, i32)>> = BinaryHeap::new();
        // Dijkstra over stopping cells, but the hole is a terminal that
        // captures the ball mid-roll. States carry (distance, instructions)
        // and the heap orders by distance first, string second, so the first
        // time the hole pops, its pair is distance-minimal and, among those,
        // lexicographically minimal.
        dist[ball[0] as usize][ball[1] as usize] = 0;
        heap.push(Reverse((0, String::new(), ball[0], ball[1])));
        let dirs: [(i32, i32); 4] = [(1, 0), (0, -1), (0, 1), (-1, 0)];
        let letters = ['d', 'l', 'r', 'u'];
        while let Some(Reverse((d, p, r, c))) = heap.pop() {
            // Dijkstra settles cells in (distance, instructions) order:
            // hole popped => its pair is final.
            if r == hr && c == hc {
                return p;
            }
            // Stale heap entry (cell was already relaxed smaller): skip.
            if d > dist[r as usize][c as usize]
                || (d == dist[r as usize][c as usize] && p > path[r as usize][c as usize])
            {
                continue;
            }
            // The "next direction must differ from the last" rule needs no
            // code: the ball stopped against a wall in that direction, so
            // re-choosing it rolls zero cells.
            for (dir, &(dr, dc)) in dirs.iter().enumerate() {
                // Roll until the next cell is a wall/border — but stepping
                // onto the hole ends the roll right there: the ball drops
                // in instead of rolling on.
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
                    if nr == hr && nc == hc {
                        break;
                    }
                }
                if steps > 0 {
                    let nd = d + steps;
                    let np = format!("{}{}", p, letters[dir]);
                    let (cr, cc) = (nr as usize, nc as usize);
                    // Relax on the (distance, instructions) pair.
                    if dist[cr][cc] == -1 || nd < dist[cr][cc] || (nd == dist[cr][cc] && np < path[cr][cc]) {
                        dist[cr][cc] = nd;
                        path[cr][cc] = np.clone();
                        heap.push(Reverse((nd, np, nr, nc)));
                    }
                }
            }
        }
        // Heap exhausted: the ball can never reach the hole.
        "impossible".to_string()
    }
}
