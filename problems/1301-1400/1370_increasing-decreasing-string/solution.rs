impl Solution {
    pub fn sort_string(s: String) -> String {
        let mut counts = [0usize; 26];
        for b in s.bytes() {
            counts[(b - b'a') as usize] += 1;
        }
        let mut remaining = s.len();
        let mut out = Vec::with_capacity(s.len());
        let mut forward = true;
        while remaining > 0 {
            for k in 0..26usize {
                let i = if forward { k } else { 25 - k };
                if counts[i] > 0 {
                    counts[i] -= 1;
                    remaining -= 1;
                    out.push(b'a' + i as u8);
                }
            }
            forward = !forward;
        }
        String::from_utf8(out).unwrap()
    }
}
