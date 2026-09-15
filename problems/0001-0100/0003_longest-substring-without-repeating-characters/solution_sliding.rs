impl Solution {
    pub fn length_of_longest_substring(s: String) -> i32 {
        // in_window marks the characters currently inside the window, which
        // never contains a duplicate (bytes fold into 128 slots).
        let mut in_window = [false; 128];
        let bytes = s.as_bytes();
        let mut start = 0usize;
        let mut best = 0i32;
        for i in 0..bytes.len() {
            let idx = (bytes[i] as usize) & 127;
            // Evict characters from the left until the new byte can enter
            // without duplicating: shrink one step at a time.
            while in_window[idx] {
                in_window[(bytes[start] as usize) & 127] = false;
                start += 1;
            }
            in_window[idx] = true;
            // The window is duplicate-free again: record its length.
            best = best.max((i - start + 1) as i32);
        }
        best
    }
}
