impl Solution {
    pub fn min_operations(nums: Vec<i32>) -> Vec<i32> {
        // A binary palindrome is completely determined by its first half
        // of bits: mirror that half around the middle and the whole string
        // is fixed. So every candidate nearest palindrome is one of: the
        // mirrors of the value's own first half and the halves one step
        // below/above it, plus the two length-boundary forms.
        nums.into_iter()
            .map(|value| {
                let length = 32 - (value as u32).leading_zeros() as usize;
                let half_len = (length + 1) / 2;
                let head = (value >> (length - half_len)) as i32;
                let mut best = -1;
                for h in [head - 1, head, head + 1] {
                    if (h >> (half_len - 1)) == 0 {
                        continue; // would lose its leading one — not a b-bit head
                    }
                    let d = (value - mirror(h, half_len, length)).abs();
                    if best < 0 || d < best {
                        best = d;
                    }
                }
                let boundaries = [(1 << (length - 1)) - 1, (1 << length) + 1];
                for boundary in boundaries {
                    let d = (value - boundary).abs();
                    if d < best {
                        best = d;
                    }
                }
                best
            })
            .collect()
    }
}

// Build the full palindrome from its first half of bits: emit the half
// MSB-first, then append the mirrored tail — every bit except the shared
// center for odd lengths (bit 0 of the half), all bits for even lengths.
fn mirror(head: i32, half_len: usize, length: usize) -> i32 {
    let mut full = 0;
    for i in (0..half_len).rev() {
        full = full * 2 + ((head >> i) & 1);
    }
    let start = if length % 2 == 0 { 0 } else { 1 };
    for i in start..half_len {
        full = full * 2 + ((head >> i) & 1);
    }
    full
}
