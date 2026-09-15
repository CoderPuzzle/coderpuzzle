impl Solution {
    pub fn count_divisible_substrings(word: String) -> i32 {
        let digit = b"11222333444555666777788899";
        let bytes = word.as_bytes();
        let n = bytes.len();
        let mut pre = vec![0i32; n + 1];
        for i in 0..n {
            pre[i + 1] = pre[i] + (digit[(bytes[i] - b'a') as usize] - b'0') as i32;
        }
        let mut count = 0;
        for start in 0..n {
            for end in start + 1..=n {
                if (pre[end] - pre[start]) % ((end - start) as i32) == 0 {
                    count += 1;
                }
            }
        }
        count
    }
}
