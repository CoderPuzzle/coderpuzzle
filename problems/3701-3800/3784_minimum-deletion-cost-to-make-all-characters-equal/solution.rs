impl Solution {
    pub fn min_cost(s: String, cost: Vec<i32>) -> i64 {
        let mut totals = [0i64; 26];
        for (ch, c) in s.bytes().zip(cost) {
            totals[(ch - b'a') as usize] += c as i64;
        }
        let mut sum = 0i64;
        let mut best = 0i64;
        for t in totals {
            sum += t;
            best = best.max(t);
        }
        sum - best
    }
}
