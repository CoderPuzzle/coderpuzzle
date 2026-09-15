use std::collections::VecDeque;

impl Solution {
    pub fn coin_change(coins: Vec<i32>, amount: i32) -> i32 {
        // BFS over amounts: level k holds every amount reachable with
        // exactly k coins, so the first time `amount` is dequeued its level
        // is the minimum coin count.
        let mut visited = vec![false; amount as usize + 1];
        visited[0] = true;
        let mut queue: VecDeque<usize> = VecDeque::new();
        queue.push_back(0);
        let mut level = 0;
        while !queue.is_empty() {
            let size = queue.len();
            for _ in 0..size {
                let a = queue.pop_front().unwrap();
                if a == amount as usize {
                    // Level order guarantees no cheaper level exists.
                    return level;
                }
                for &c in &coins {
                    // Coins may be huge, so test c <= amount - a before
                    // adding; visited keeps each amount enqueued once.
                    if c >= 0 && c as usize <= amount as usize - a {
                        let next = a + c as usize;
                        if !visited[next] {
                            visited[next] = true;
                            queue.push_back(next);
                        }
                    }
                }
            }
            level += 1;
        }
        // The queue drained without ever reaching amount: unmakeable.
        -1
    }
}
