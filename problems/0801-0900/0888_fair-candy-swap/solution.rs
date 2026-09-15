use std::collections::HashSet;

impl Solution {
    pub fn fair_candy_swap(alice_sizes: Vec<i32>, bob_sizes: Vec<i32>) -> Vec<i32> {
        // Swapping Alice's box a for Bob's box b leaves both totals equal
        // exactly when sumA - a + b == sumB - b + a, which rearranges to
        // b == a - delta with delta = (sumA - sumB) / 2. A hash set of
        // Bob's boxes answers each candidate in O(1), and one scan that
        // keeps the smallest matching pair (a first, then b) yields the
        // statement's pinned answer.
        let alice_total: i64 = alice_sizes.iter().map(|&size| size as i64).sum();
        let bob_total: i64 = bob_sizes.iter().map(|&size| size as i64).sum();
        let delta = (alice_total - bob_total) / 2;
        let bob_boxes: HashSet<i64> = bob_sizes.iter().map(|&size| size as i64).collect();
        let mut best: Option<(i64, i64)> = None;
        for &size in &alice_sizes {
            let b = size as i64 - delta;
            let better = best.map_or(true, |(a, b0)| (size as i64, b) < (a, b0));
            if bob_boxes.contains(&b) && better {
                best = Some((size as i64, b));
            }
        }
        match best {
            Some((a, b)) => vec![a as i32, b as i32],
            None => Vec::new(),
        }
    }
}
