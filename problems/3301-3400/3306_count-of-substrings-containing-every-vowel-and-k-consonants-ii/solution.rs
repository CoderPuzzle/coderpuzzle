impl Solution {
    pub fn count_of_substrings(word: String, k: i32) -> i64 {
        // Count windows with all five vowels and >= c consonants, for c = k
        // and c = k + 1; their difference is the number with exactly k
        // consonants. For each left end l, grow r until the window first
        // qualifies; that minimal right end never moves backwards, so every
        // character enters and leaves the window once — linear overall. The
        // answer reaches ~n^2/2 = 2e10, so it is accumulated in an i64.
        let bytes = word.as_bytes();
        let n = bytes.len();
        let vowel_index = |c: u8| -> i32 {
            match c {
                b'a' => 0,
                b'e' => 1,
                b'i' => 2,
                b'o' => 3,
                b'u' => 4,
                _ => -1,
            }
        };
        let at_least = |need: i32| -> i64 {
            let mut have = [0i32; 5];
            let mut distinct: i32 = 0;
            let mut cons: i32 = 0;
            let mut total: i64 = 0;
            let mut r = 0usize;
            for l in 0..n {
                // Grow the window until it has every vowel and >= need consonants.
                while r < n && (distinct < 5 || cons < need) {
                    let v = vowel_index(bytes[r]);
                    if v >= 0 {
                        if have[v as usize] == 0 {
                            distinct += 1;
                        }
                        have[v as usize] += 1;
                    } else {
                        cons += 1;
                    }
                    r += 1;
                }
                if distinct < 5 || cons < need {
                    // No window starting at l (or any later l) can qualify.
                    break;
                }
                total += (n - (r - 1)) as i64;
                // Drop word[l] before moving to the next left end.
                let v = vowel_index(bytes[l]);
                if v >= 0 {
                    have[v as usize] -= 1;
                    if have[v as usize] == 0 {
                        distinct -= 1;
                    }
                } else {
                    cons -= 1;
                }
            }
            total
        };
        at_least(k) - at_least(k + 1)
    }
}
