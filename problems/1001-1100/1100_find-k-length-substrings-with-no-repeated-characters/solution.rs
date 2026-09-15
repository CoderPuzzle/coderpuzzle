impl Solution {
    pub fn num_k_len_substr_no_repeats(s: String, k: i32) -> i32 {
        // A window of length k is valid exactly when all k positions hold
        // different characters, i.e. distinct == k. Slide in place.
        let bytes = s.as_bytes();
        let n = bytes.len();
        let k = k as usize;
        if k > n || k > 26 {
            return 0;
        }
        let mut freq = [0i32; 26];
        let (mut distinct, mut ans) = (0i32, 0i32);
        for i in 0..n {
            let right = (bytes[i] - b'a') as usize;
            freq[right] += 1;
            if freq[right] == 1 {
                distinct += 1;
            }
            if i >= k {
                let left = (bytes[i - k] - b'a') as usize;
                freq[left] -= 1;
                if freq[left] == 0 {
                    distinct -= 1;
                }
            }
            if distinct as usize == k {
                ans += 1;
            }
        }
        ans
    }
}
