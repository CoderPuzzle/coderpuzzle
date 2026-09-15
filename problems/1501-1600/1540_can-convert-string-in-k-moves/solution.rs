impl Solution {
    pub fn can_convert_string(s: String, t: String, k: i32) -> bool {
        // equal length is guaranteed by the constraints
        if s.len() != t.len() {
            return false;
        }
        // count how many positions need each shift amount d in 1..25
        let mut need_count = [0i64; 26];
        for (a, b) in s.bytes().zip(t.bytes()) {
            let d = ((b as i32 - a as i32) % 26 + 26) % 26;
            if d != 0 {
                need_count[d as usize] += 1;
            }
        }
        // the j-th position needing shift d must use move d + 26*(j-1)
        for d in 1..26i64 {
            let count = need_count[d as usize];
            if count == 0 {
                continue;
            }
            let last_move = d + 26 * (count - 1);
            if last_move > k as i64 {
                return false;
            }
        }
        true
    }
}
