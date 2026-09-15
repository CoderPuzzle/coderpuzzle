impl Solution {
    pub fn rearrange_characters(s: String, target: String) -> i32 {
        let mut have = [0_i32; 26];
        let mut need = [0_i32; 26];
        for byte in s.bytes() {
            have[(byte - b'a') as usize] += 1;
        }
        for byte in target.bytes() {
            need[(byte - b'a') as usize] += 1;
        }
        let mut answer = 100;
        for ch in 0..26 {
            if need[ch] > 0 {
                answer = answer.min(have[ch] / need[ch]);
            }
        }
        answer
    }
}
