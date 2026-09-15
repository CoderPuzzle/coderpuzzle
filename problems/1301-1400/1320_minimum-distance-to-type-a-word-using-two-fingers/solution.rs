impl Solution {
    pub fn minimum_distance(word: String) -> i32 {
        // dp[o] = cheapest cost of the typed prefix with the resting finger on
        // letter o (o == 26 models the still-unused finger, distance 0).
        fn dist(a: usize, b: usize) -> i32 {
            if a == 26 || b == 26 {
                return 0;
            }
            ((a / 6) as i32 - (b / 6) as i32).abs() + ((a % 6) as i32 - (b % 6) as i32).abs()
        }
        let bytes = word.as_bytes();
        let mut dp = vec![0i32; 27];
        for i in 1..bytes.len() {
            let prev = (bytes[i - 1] - b'A') as usize;
            let cur = (bytes[i] - b'A') as usize;
            let step = dist(prev, cur);
            let mut nxt = vec![i32::MAX; 27];
            for (o, &cost) in dp.iter().enumerate() {
                if cost == i32::MAX {
                    continue;
                }
                // Move the finger that just typed; the resting finger stays.
                let with_step = cost.saturating_add(step);
                if with_step < nxt[o] {
                    nxt[o] = with_step;
                }
                // The resting finger types cur; prev becomes the new rest.
                let move_cost = cost.saturating_add(dist(o, cur));
                if move_cost < nxt[prev] {
                    nxt[prev] = move_cost;
                }
            }
            dp = nxt;
        }
        *dp.iter().min().unwrap()
    }
}
