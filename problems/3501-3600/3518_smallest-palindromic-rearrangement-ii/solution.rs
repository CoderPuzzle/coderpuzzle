impl Solution {
    // min(multinomial of the half counts over r slots, remaining): a product
    // of binomials abandoned the moment it reaches remaining.
    fn arrangements(half: &[i32; 26], r: usize, remaining: i64) -> i64 {
        let mut acc: i64 = 1;
        let mut rem = r as i64;
        for &c in half {
            if c == 0 {
                continue;
            }
            let c = c as i64;
            let small = c.min(rem - c);
            let mut binom: i64 = 1;
            for j in 1..=small {
                binom = binom * (rem - small + j) / j;
                if binom >= remaining {
                    binom = remaining;
                    break;
                }
            }
            acc *= binom;
            if acc >= remaining {
                return remaining;
            }
            rem -= c;
        }
        acc
    }

    pub fn smallest_palindrome(s: String, k: i32) -> String {
        // The k-th palindrome is the k-th arrangement of the forced half
        // multiset (count[c] / 2 of each letter), mirrored around the lone
        // odd letter. Walk the half's positions picking, smallest letter
        // first, the letter whose block still contains rank k. Multinomials
        // are capped at k; every intermediate stays below k * n
        // <= 10^6 * 5000, well inside 64-bit.
        let bytes = s.as_bytes();
        let mut counts = [0i32; 26];
        for &b in bytes {
            counts[(b - b'a') as usize] += 1;
        }
        let mut half = [0i32; 26];
        let m = bytes.len() / 2;
        let mut middle = String::new();
        for i in 0..26 {
            half[i] = counts[i] / 2;
            if counts[i] % 2 == 1 {
                middle = ((b'a' + i as u8) as char).to_string();
            }
        }
        let mut remaining = k as i64;
        if Self::arrangements(&half, m, remaining) < remaining {
            return String::new();
        }
        let mut picked: Vec<u8> = Vec::with_capacity(m);
        let mut r = m as i64;
        while r > 0 {
            for c in 0..26 {
                if half[c] == 0 {
                    continue;
                }
                half[c] -= 1;
                let ways = Self::arrangements(&half, (r - 1) as usize, remaining);
                if remaining <= ways {
                    picked.push(b'a' + c as u8);
                    r -= 1;
                    break;
                }
                remaining -= ways;
                half[c] += 1;
            }
        }
        let front = String::from_utf8(picked).unwrap();
        let tail: String = front.chars().rev().collect();
        front + &middle + &tail
    }
}
