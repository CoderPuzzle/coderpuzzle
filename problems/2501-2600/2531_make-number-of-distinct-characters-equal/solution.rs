impl Solution {
    pub fn is_it_possible(word1: String, word2: String) -> bool {
        // One frequency array per word: any single move shifts exactly two
        // buckets, so its effect on the distinct counts is O(1) to evaluate.
        let mut c1 = [0i32; 26];
        let mut c2 = [0i32; 26];
        for &b in word1.as_bytes() {
            c1[(b - b'a') as usize] += 1;
        }
        for &b in word2.as_bytes() {
            c2[(b - b'a') as usize] += 1;
        }
        let count = |c: &[i32; 26]| c.iter().filter(|&&v| v > 0).count();
        let n1 = count(&c1);
        let n2 = count(&c2);
        // Try every ordered pair (a, b): letter a leaves word1 and letter b
        // takes its place; equal letters mean the swap changes nothing.
        for a in 0..26 {
            if c1[a] == 0 {
                continue;
            }
            for b in 0..26 {
                if c2[b] == 0 {
                    continue;
                }
                if a == b {
                    // Swapping identical letters changes nothing, so this
                    // candidate succeeds exactly when the words already tie.
                    if n1 == n2 {
                        return true;
                    }
                    continue;
                }
                let d1 = n1 as i32 - i32::from(c1[a] == 1) + i32::from(c1[b] == 0);
                let d2 = n2 as i32 - i32::from(c2[b] == 1) + i32::from(c2[a] == 0);
                if d1 == d2 {
                    return true;
                }
            }
        }
        false
    }
}
