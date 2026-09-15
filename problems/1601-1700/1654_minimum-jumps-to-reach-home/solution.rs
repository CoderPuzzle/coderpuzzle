use std::collections::VecDeque;

// Treat the line as a graph whose nodes are (position, back) pairs, back
// marking that the previous jump went backward — the state that forbids
// a second consecutive backward jump. Breadth-first search by jump count
// reaches home in the fewest jumps; the line only needs to be explored
// up to max(x, max(forbidden)) + a + b, because above that line there is
// nothing to land on that matters, and each backward jump must be paid
// for by a following forward jump, so a useful overshoot tops out one
// forward step plus one backward reach higher.
impl Solution {
    pub fn minimum_jumps(forbidden: Vec<i32>, a: i32, b: i32, x: i32) -> i32 {
        let highest = forbidden.iter().copied().chain([x]).max().unwrap_or(0);
        let limit = highest + a + b;
        let mut blocked = vec![false; limit as usize + 1];
        for &position in &forbidden {
            blocked[position as usize] = true;
        }
        // seen[position][back] — back == 1 means the previous jump was backward
        let mut seen = vec![[false; 2]; limit as usize + 1];
        seen[0][0] = true;
        let mut frontier = VecDeque::from([(0, 0)]);
        let mut jumps = 0;
        while !frontier.is_empty() {
            for _ in 0..frontier.len() {
                let (position, back) = frontier.pop_front().unwrap();
                if position == x {
                    return jumps;
                }
                let forward = position + a;
                if forward <= limit && !blocked[forward as usize] && !seen[forward as usize][0] {
                    seen[forward as usize][0] = true;
                    frontier.push_back((forward, 0));
                }
                if back == 0 {
                    let backward = position - b;
                    if backward >= 0 && !blocked[backward as usize] && !seen[backward as usize][1] {
                        seen[backward as usize][1] = true;
                        frontier.push_back((backward, 1));
                    }
                }
            }
            jumps += 1;
        }
        -1
    }
}
