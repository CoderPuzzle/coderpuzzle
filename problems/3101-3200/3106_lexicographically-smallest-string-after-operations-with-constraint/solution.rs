impl Solution {
    // Greedy per position: the smallest feasible letter is 'a' when its
    // cyclic distance still fits the budget; otherwise every smaller
    // letter is out of reach and exactly `budget` steps down from s[i]
    // is the first affordable letter.
    pub fn get_smallest_string(s: String, k: i32) -> String {
        let mut result = String::with_capacity(s.len());
        let mut budget = k;
        for ch in s.bytes() {
            let step = (ch - b'a') as i32;
            let to_a = step.min(26 - step);
            if to_a <= budget {
                result.push('a');
                budget -= to_a;
            } else {
                result.push((ch - budget as u8) as char);
                budget = 0;
            }
        }
        result
    }
}
