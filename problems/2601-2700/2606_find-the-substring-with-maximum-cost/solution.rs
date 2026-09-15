impl Solution {
    pub fn maximum_cost_substring(s: String, chars: String, vals: Vec<i32>) -> i32 {
        // Resolve each letter's value once (defaults from the alphabet,
        // overrides from chars), then Kadane's algorithm; snapping the
        // running sum back to 0 whenever it dips negative keeps the empty
        // substring's cost of 0 as the floor for the answer. Costs are
        // bounded by 1e5 * 1000 = 1e8, safely inside i32 range.
        let mut value = [0i32; 26];
        for (i, slot) in value.iter_mut().enumerate() {
            *slot = i as i32 + 1;
        }
        for (i, b) in chars.bytes().enumerate() {
            value[(b - b'a') as usize] = vals[i];
        }
        let mut best = 0;
        let mut run = 0;
        for b in s.bytes() {
            run = (run + value[(b - b'a') as usize]).max(0);
            best = best.max(run);
        }
        best
    }
}
