impl Solution {
    pub fn min_anagram_length(s: String) -> i32 {
        // t repeats, so len(t) = L divides n = len(s) and every n / L
        // chunk must carry the same letter multiset as the first chunk:
        // sweep the divisors of n ascending and take the first survivor.
        // A running count that exceeds the first chunk's count already
        // proves the chunk differs, so failed candidates die early.
        let bytes = s.as_bytes();
        let n = bytes.len() as i32;
        for length in 1..=n {
            if n % length != 0 {
                continue;
            }
            let length = length as usize;
            let mut base = [0usize; 26];
            for &b in &bytes[..length] {
                base[(b - b'a') as usize] += 1;
            }
            let mut run = [0usize; 26];
            let mut filled = 0usize;
            let mut ok = true;
            for &b in bytes {
                let c = (b - b'a') as usize;
                run[c] += 1;
                if run[c] > base[c] {
                    ok = false;
                    break;
                }
                filled += 1;
                if filled == length {
                    if run != base {
                        ok = false;
                        break;
                    }
                    run = [0usize; 26];
                    filled = 0;
                }
            }
            if ok && filled == 0 {
                return length as i32;
            }
        }
        n
    }
}
