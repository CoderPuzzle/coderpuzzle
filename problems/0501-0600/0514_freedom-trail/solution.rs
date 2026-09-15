impl Solution {
    pub fn find_rotate_steps(ring: String, key: String) -> i32 {
        let ring = ring.as_bytes();
        let key = key.as_bytes();
        let n = ring.len();
        // Precompute each character's indices so every stage only
        // considers alignments that actually spell the current key
        // character (never empty because the key is guaranteed spellable).
        let mut positions: Vec<Vec<usize>> = vec![Vec::new(); 26];
        for i in 0..n {
            positions[(ring[i] - b'a') as usize].push(i);
        }
        const INF: i32 = 1 << 30;
        // dp: ring index aligned at 12:00 -> min rotation steps so far
        let mut dp = vec![INF; n];
        let mut active: Vec<usize> = vec![0];
        dp[0] = 0;
        for &ch in key {
            let mut ndp = vec![INF; n];
            let mut nactive: Vec<usize> = Vec::with_capacity(positions[(ch - b'a') as usize].len());
            for &j in &positions[(ch - b'a') as usize] {
                let mut best = INF;
                for &i in &active {
                    // Circular rotation cost between alignments i and j:
                    // the shorter of the direct and wrap-around distances.
                    let diff = (i as i32 - j as i32).abs();
                    let rot = diff.min(n as i32 - diff);
                    best = best.min(dp[i] + rot);
                }
                ndp[j] = best;
                nactive.push(j);
            }
            dp = ndp;
            active = nactive;
        }
        // Cheapest final alignment, plus one button press per key char.
        let mut ans = INF;
        for &i in &active {
            ans = ans.min(dp[i]);
        }
        ans + key.len() as i32
    }
}
