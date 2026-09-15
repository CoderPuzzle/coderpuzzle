impl Solution {
    pub fn last_non_empty_string(s: String) -> String {
        let mut counts = [0_usize; 26];
        for byte in s.bytes() {
            counts[(byte - b'a') as usize] += 1;
        }
        let top = *counts.iter().max().unwrap();
        let mut taken = [false; 26];
        let mut kept: Vec<u8> = Vec::new();
        for index in (0..s.len()).rev() {
            let slot = (s.as_bytes()[index] - b'a') as usize;
            if counts[slot] == top && !taken[slot] {
                taken[slot] = true;
                kept.push(s.as_bytes()[index]);
            }
        }
        kept.reverse();
        String::from_utf8(kept).unwrap()
    }
}
