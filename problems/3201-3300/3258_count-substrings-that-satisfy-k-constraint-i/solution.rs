impl Solution {
    pub fn count_k_constraint_substrings(s: String, k: i32) -> i32 {
        let bytes = s.as_bytes();
        let n = bytes.len();
        let mut answer = 0_i32;
        for left in 0..n {
            let mut zeros = 0_i32;
            for right in left..n {
                if bytes[right] == b'0' {
                    zeros += 1;
                }
                let ones = (right - left + 1) as i32 - zeros;
                if zeros <= k || ones <= k {
                    answer += 1;
                }
            }
        }
        answer
    }
}
