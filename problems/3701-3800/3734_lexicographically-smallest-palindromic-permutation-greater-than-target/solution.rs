impl Solution {
    pub fn lex_palindromic_permutation(s: String, target: String) -> String {
        let n = s.len();
        // Counts of each letter of s. Inputs are lowercase ASCII, so bytes
        // are exactly the characters.
        let mut freq = [0i32; 26];
        for ch in s.bytes() {
            freq[(ch - b'a') as usize] += 1;
        }
        // Parity law: every count even, or exactly one odd count absorbed by
        // the middle character when n is odd.
        let mut odds = 0;
        let mut odd_letter: i32 = -1;
        for d in 0..26 {
            if freq[d] % 2 == 1 {
                odds += 1;
                odd_letter = d as i32;
            }
        }
        if odds != (n % 2) as i32 {
            return String::new();
        }
        // The half multiset is forced — freq[d] / 2 of every letter — and on
        // odd lengths the odd letter pins the middle, so comparing
        // palindromes reduces to comparing (half, middle, mirrored half).
        let mut half = [0i32; 26];
        for d in 0..26 {
            half[d] = freq[d] / 2;
        }
        let m = n / 2;
        let tb = target.as_bytes();
        let p = &tb[..m];
        // Candidate 1: keep the half equal to target's own first half p. That
        // pins the entire palindrome, which qualifies only if it already
        // clears target past the shared prefix.
        let mut best: Option<Vec<u8>> = None;
        if counts_of(p) == half {
            let mut mirrored = p.to_vec();
            mirrored.reverse();
            let suffix = tb[(m + n % 2)..].to_vec();
            let wins = if n % 2 == 0 {
                mirrored > suffix
            } else {
                let mid = (tb[m] - b'a') as i32;
                odd_letter > mid || (odd_letter == mid && mirrored > suffix)
            };
            if wins {
                best = Some(p.to_vec());
            }
        }
        // Candidate 2: the smallest half arrangement strictly greater than p
        // — match p as far as possible, remembering the latest position where
        // a larger still-available letter existed, and fall back to it.
        if best.is_none() {
            let mut cur = half;
            let mut bump_at: i32 = -1;
            let mut bump_ch: usize = 0;
            let mut bump_cur = [0i32; 26];
            for i in 0..m {
                let ci = (p[i] - b'a') as usize;
                for d in ci + 1..26 {
                    if cur[d] > 0 {
                        bump_at = i as i32;
                        bump_ch = d;
                        bump_cur = cur;
                        break;
                    }
                }
                if cur[ci] == 0 {
                    break;
                }
                cur[ci] -= 1;
            }
            if bump_at >= 0 {
                bump_cur[bump_ch] -= 1;
                let mut arranged = tb[..bump_at as usize].to_vec();
                arranged.push(b'a' + bump_ch as u8);
                for d in 0..26 {
                    for _ in 0..bump_cur[d] {
                        arranged.push(b'a' + d as u8);
                    }
                }
                best = Some(arranged);
            }
        }
        let best = match best {
            Some(v) => v,
            None => return String::new(),
        };
        let mut result = best.clone();
        if n % 2 == 1 {
            result.push(b'a' + odd_letter as u8);
        }
        for i in (0..m).rev() {
            result.push(best[i]);
        }
        String::from_utf8(result).unwrap()
    }
}

fn counts_of(w: &[u8]) -> [i32; 26] {
    let mut cw = [0i32; 26];
    for &ch in w {
        cw[(ch - b'a') as usize] += 1;
    }
    cw
}
