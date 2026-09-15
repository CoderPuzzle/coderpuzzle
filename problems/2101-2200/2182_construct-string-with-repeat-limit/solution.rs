impl Solution {
    pub fn repeat_limited_string(s: String, repeat_limit: i32) -> String {
        // Greedy: always emit the largest letter still available; when it
        // exhausts its allowed run, spend one unit of the next largest as
        // a separator, then resume.
        let mut counts = [0usize; 26];
        for b in s.bytes() {
            counts[(b - b'a') as usize] += 1;
        }
        let mut out = String::with_capacity(s.len());
        let mut i: i32 = 25;
        loop {
            while i >= 0 && counts[i as usize] == 0 {
                i -= 1;
            }
            if i < 0 {
                break;
            }
            let run = std::cmp::min(repeat_limit as usize, counts[i as usize]);
            let letter = (b'a' + i as u8) as char;
            out.push_str(&letter.to_string().repeat(run));
            counts[i as usize] -= run;
            if counts[i as usize] == 0 {
                continue;
            }
            let mut j = i - 1;
            while j >= 0 && counts[j as usize] == 0 {
                j -= 1;
            }
            if j < 0 {
                break;
            }
            out.push((b'a' + j as u8) as char);
            counts[j as usize] -= 1;
        }
        out
    }
}
