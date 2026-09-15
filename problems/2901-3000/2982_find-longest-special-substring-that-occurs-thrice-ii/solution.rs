impl Solution {
    pub fn maximum_length(s: String) -> i32 {
        // At 5*10^5 characters only run-length structure matters: group
        // each character's run lengths, keep the top three, and take the
        // best of the three ways to place three windows.
        let mut runs: Vec<Vec<i32>> = vec![Vec::new(); 26];
        let bytes = s.as_bytes();
        let n = bytes.len();
        let mut i = 0;
        while i < n {
            let mut j = i;
            while j < n && bytes[j] == bytes[i] {
                j += 1;
            }
            runs[(bytes[i] - b'a') as usize].push((j - i) as i32);
            i = j;
        }
        let mut best = -1;
        for rs in &mut runs {
            if rs.is_empty() {
                continue;
            }
            rs.sort_unstable_by(|a, b| b.cmp(a));
            let f1 = rs[0];
            let f2 = if rs.len() > 1 { rs[1] } else { 0 };
            let f3 = if rs.len() > 2 { rs[2] } else { 0 };
            // three windows in one run / two + one / one in each;
            // a 0 candidate means this character never reaches three.
            let cand = (f1 - 2).max((f1 - 1).min(f2)).max(f3);
            if cand >= 1 && cand > best {
                best = cand;
            }
        }
        best
    }
}
