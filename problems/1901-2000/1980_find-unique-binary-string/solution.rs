impl Solution {
    pub fn find_different_binary_string(nums: Vec<String>) -> String {
        let n = nums.len();
        let mut answer = vec![b'0'; n];
        for (i, s) in nums.iter().enumerate() {
            answer[i] = if s.as_bytes()[i] == b'0' { b'1' } else { b'0' };
        }
        String::from_utf8(answer).unwrap()
    }
}
