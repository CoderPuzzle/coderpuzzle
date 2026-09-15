impl Solution {
    pub fn num_splits(s: String) -> i32 {
        let bytes = s.as_bytes();
        let n = bytes.len();

        // prefix[i]: number of distinct letters in s[0..=i]
        let mut prefix = vec![0i32; n];
        let mut seen = [false; 26];
        let mut distinct = 0;
        for i in 0..n {
            let idx = (bytes[i] - b'a') as usize;
            if !seen[idx] {
                seen[idx] = true;
                distinct += 1;
            }
            prefix[i] = distinct;
        }

        // suffix[i]: number of distinct letters in s[i..n]
        let mut suffix = vec![0i32; n];
        seen = [false; 26];
        distinct = 0;
        for i in (0..n).rev() {
            let idx = (bytes[i] - b'a') as usize;
            if !seen[idx] {
                seen[idx] = true;
                distinct += 1;
            }
            suffix[i] = distinct;
        }

        let mut count = 0;
        for i in 0..n - 1 {
            if prefix[i] == suffix[i + 1] {
                count += 1;
            }
        }
        count
    }
}
