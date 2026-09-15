impl Solution {
    pub fn max_rep_opt1(text: String) -> i32 {
        let bytes = text.as_bytes();
        let mut counts = [0i32; 256];
        for &b in bytes {
            counts[b as usize] += 1;
        }
        // run-length encode
        let mut run_chars: Vec<u8> = Vec::new();
        let mut run_lens: Vec<i32> = Vec::new();
        for &b in bytes {
            if let Some(last) = run_chars.last() {
                if *last == b {
                    let n = run_lens.len();
                    run_lens[n - 1] += 1;
                    continue;
                }
            }
            run_chars.push(b);
            run_lens.push(1);
        }
        let mut best = 0i32;
        for i in 0..run_chars.len() {
            let ch = run_chars[i] as usize;
            best = best.max((run_lens[i] + 1).min(counts[ch]));
        }
        for i in 1..run_chars.len().saturating_sub(1) {
            if run_lens[i] == 1 && run_chars[i - 1] == run_chars[i + 1] {
                let ch = run_chars[i - 1] as usize;
                let combined = run_lens[i - 1] + run_lens[i + 1];
                let extra = if counts[ch] > combined { 1 } else { 0 };
                best = best.max(combined + extra);
            }
        }
        best
    }
}
