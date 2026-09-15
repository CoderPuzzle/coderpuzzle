impl Solution {
    pub fn longest_balanced(s: String) -> i32 {
        // Fixing the left end and growing the right one adds a single letter
        // per step, so the count array, the number of live letters, and the
        // largest count among them all update in constant time. Counts only
        // rise within one sweep, so the max is exact after each increment.
        let bytes = s.as_bytes();
        let n = bytes.len();
        let mut best = 0i32;
        for i in 0..n {
            let mut counts = [0i32; 26];
            let mut distinct = 0usize;
            let mut top = 0i32;
            for j in i..n {
                let c = (bytes[j] - b'a') as usize;
                if counts[c] == 0 {
                    distinct += 1;
                }
                counts[c] += 1;
                if counts[c] > top {
                    top = counts[c];
                }
                // The counts sum to the window length, so they are all equal
                // exactly when their common value times the number of live
                // letters fills the length; a single live letter always wins.
                let length = (j - i + 1) as i32;
                if distinct as i32 * top == length && length > best {
                    best = length;
                }
            }
        }
        best
    }
}
