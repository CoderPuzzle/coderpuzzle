impl Solution {
    pub fn count_quadruples(first_string: String, second_string: String) -> i32 {
        // Only single-character pairs can be optimal: a longer match
        // shrinks to its two leading characters (same a, smaller j), and
        // each letter does best pairing its first occurrence here with
        // its last occurrence there.
        let f = first_string.as_bytes();
        let s = second_string.as_bytes();
        let n1 = f.len() as i32;
        let mut first = [n1; 26];
        let mut last = [-1i32; 26];
        for (i, &b) in f.iter().enumerate() {
            let c = usize::from(b - b'a');
            if first[c] == n1 {
                first[c] = i as i32;
            }
        }
        for (a, &b) in s.iter().enumerate() {
            last[usize::from(b - b'a')] = a as i32;
        }
        let mut best = 0;
        let mut count = 0;
        let mut any = false;
        for c in 0..26 {
            if first[c] == n1 || last[c] == -1 {
                continue;
            }
            let diff = first[c] - last[c];
            if !any || diff < best {
                any = true;
                best = diff;
                count = 1;
            } else if diff == best {
                count += 1;
            }
        }
        count
    }
}
