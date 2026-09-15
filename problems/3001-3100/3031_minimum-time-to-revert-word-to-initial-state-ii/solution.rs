impl Solution {
    pub fn minimum_time_to_initial_state(word: String, k: i32) -> i32 {
        let bytes = word.as_bytes();
        let n = bytes.len();
        let mut fail = vec![0_usize; n];
        let mut length = 0_usize;
        for i in 1..n {
            let c = bytes[i];
            while length > 0 && bytes[length] != c {
                length = fail[length - 1];
            }
            if bytes[length] == c {
                length += 1;
            }
            fail[i] = length;
        }
        let mut is_border = vec![false; n + 1];
        let mut cut = fail[n - 1];
        while cut > 0 {
            is_border[cut] = true;
            cut = fail[cut - 1];
        }
        let step = k as usize;
        let mut t = 1_usize;
        while t * step < n && !is_border[n - t * step] {
            t += 1;
        }
        t as i32
    }
}
