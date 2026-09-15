impl Solution {
    pub fn maximum_length_substring(s: String) -> i32 {
        // Slide a window over s while tracking one count per letter: grow on
        // the right each step, then shrink from the left only while the
        // freshly added letter would exceed its budget of two occurrences.
        let bytes = s.as_bytes();
        let mut counts = [0i32; 26];
        let mut best = 0;
        let mut left = 0usize;
        for right in 0..bytes.len() {
            let index = (bytes[right] - b'a') as usize;
            counts[index] += 1;
            // Only the just-extended letter can be over budget, so the window
            // never has to shrink past its first offender.
            while counts[index] > 2 {
                counts[(bytes[left] - b'a') as usize] -= 1;
                left += 1;
            }
            if (right - left + 1) as i32 > best {
                best = (right - left + 1) as i32;
            }
        }
        best
    }
}
