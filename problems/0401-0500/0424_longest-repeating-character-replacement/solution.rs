impl Solution {
    pub fn character_replacement(s: String, k: i32) -> i32 {
        let bytes = s.as_bytes();
        // A window is fixable with k changes iff length - (count of its most
        // frequent char) <= k: the non-majority chars are what get replaced.
        let mut count = [0i32; 128];
        let mut best = 0i32;
        let mut left = 0usize;
        let mut max_freq = 0i32;
        for right in 0..bytes.len() {
            let c = bytes[right] as usize;
            count[c] += 1;
            // max_freq is only raised, never lowered: a stale high value can
            // merely under-shrink, and each new longest window really
            // contains the char that set it, so validity is preserved.
            if count[c] > max_freq {
                max_freq = count[c];
            }
            // Shrink from the left until the window fits the budget again.
            while ((right - left + 1) as i32) - max_freq > k {
                count[bytes[left] as usize] -= 1;
                left += 1;
            }
            if (right - left + 1) as i32 > best {
                best = (right - left + 1) as i32;
            }
        }
        best
    }
}
