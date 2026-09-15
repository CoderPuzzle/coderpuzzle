use std::collections::VecDeque;

// Boxes are delivered in order, so every voyage carries a contiguous
// stretch boxes l+1..i and costs 2 + runs[i] - runs[l+1]: one trip per
// port change inside the stretch, plus the first port and the return to
// storage (runs counts port changes before each index). Pulling the
// i-dependent part out of dp[i]'s window minimum leaves key[l] =
// dp[l] - runs[l+1], so a monotonic queue of l values keyed by key
// answers each DP step in constant time while the weight and box limits
// slide the window forward.
impl Solution {
    pub fn box_delivering(boxes: Vec<Vec<i32>>, portsCount: i32, maxBoxes: i32, maxWeight: i32) -> i32 {
        let n = boxes.len();
        // running loaded weight reaches 10^5 * 10^5 = 10^10 — 64 bits
        let mut weight_prefix = vec![0i64; n + 1];
        let mut runs = vec![0i32; n + 1];
        for i in 0..n {
            weight_prefix[i + 1] = weight_prefix[i] + boxes[i][1] as i64;
            runs[i + 1] = runs[i] + i32::from(i > 0 && boxes[i - 1][0] != boxes[i][0]);
        }
        let mut dp = vec![0i32; n + 1];
        let mut key = vec![0i32; n]; // key[l] = dp[l] - runs[l+1], the part of the cost l alone decides
        let mut window: VecDeque<usize> = VecDeque::new(); // candidate l values with strictly increasing keys
        let mut lightest = 0usize; // smallest l whose loaded weight still fits maxWeight
        for i in 1..=n {
            let fresh = i - 1;
            key[fresh] = dp[fresh] - runs[i];
            while window.back().map_or(false, |&l| key[l] >= key[fresh]) {
                window.pop_back();
            }
            window.push_back(fresh);
            // weights are positive, so this floor only moves forward
            while weight_prefix[i] - weight_prefix[lightest] > maxWeight as i64 {
                lightest += 1;
            }
            let low = lightest.max(i.saturating_sub(maxBoxes as usize));
            while window[0] < low {
                window.pop_front();
            }
            dp[i] = 2 + runs[i] + key[window[0]];
        }
        dp[n]
    }
}
