impl Solution {
    pub fn smallest_number(num: String, t: i64) -> String {
        // A product of nonzero digits only ever carries the primes 2, 3, 5
        // and 7, so any other prime factor in t makes the request impossible.
        let primes = [2i64, 3, 5, 7];
        let mut need = [0usize; 4];
        let mut t = t;
        for (idx, &prime) in primes.iter().enumerate() {
            while t % prime == 0 {
                t /= prime;
                need[idx] += 1;
            }
        }
        if t != 1 {
            return "-1".to_string();
        }
        // Per-digit exponent vectors over the primes (2, 3, 5, 7).
        let mut vec = [[0usize; 4]; 10];
        for d in 2..=9i64 {
            for (idx, &prime) in primes.iter().enumerate() {
                let mut rest = d;
                while rest % prime == 0 {
                    rest /= prime;
                    vec[d as usize][idx] += 1;
                }
            }
        }
        let bytes = num.as_bytes();
        let n = bytes.len();
        // A kept 0 would poison the product, so nothing at or past the first
        // zero can be retained; the prefix sums cover the zero-free head.
        let first_zero = bytes.iter().position(|&b| b == b'0').unwrap_or(n);
        let mut prefix = vec![[0usize; 4]; first_zero + 1];
        for i in 0..first_zero {
            let add = vec[(bytes[i] - b'0') as usize];
            for k in 0..4 {
                prefix[i + 1][k] = prefix[i][k] + add[k];
            }
        }
        if first_zero == n && (0..4).all(|k| prefix[n][k] >= need[k]) {
            return num;
        }
        // Keep the longest possible prefix and raise exactly one digit: a
        // longer kept prefix always wins, then a smaller raised digit, then
        // a minimal suffix. The shortfall shrinks as the split moves left
        // while the free suffix grows, so the first workable split is the
        // answer, and only a handful of splits near the end can fail.
        for i in (0..=(n - 1).min(first_zero)).rev() {
            let free = n - 1 - i;
            let start = (bytes[i] - b'0') as usize + 1;
            for d in start..=9 {
                let mut r = [0usize; 4];
                for k in 0..4 {
                    r[k] = need[k].saturating_sub(prefix[i][k]).saturating_sub(vec[d][k]);
                }
                if Self::min_digits(&r) <= free {
                    let mut out = num[..i].to_string();
                    out.push((b'0' + d as u8) as char);
                    out.push_str(&Self::build(free, r, &vec));
                    return out;
                }
            }
        }
        // No same-length number works: the smallest longer zero-free number
        // is leading 1s with just enough covering digits at the very end.
        Self::build((n + 1).max(Self::min_digits(&need)), need, &vec)
    }

    // Fewest digits whose product covers r: a 5 or a 7 in r always burns a
    // dedicated digit; among twos and threes, eights carry three twos, nines
    // two threes, and a six trades one of each, and that trade only pays for
    // the first couple of leftovers, so a short scan finds the minimum.
    fn min_digits(r: &[usize; 4]) -> usize {
        let mut best = r[2] + r[3] + (r[0] + 2) / 3 + (r[1] + 1) / 2;
        for z in 1..=r[0].min(r[1]).min(5) {
            best = best.min(r[2] + r[3] + z + (r[0] - z + 2) / 3 + (r[1] - z + 1) / 2);
        }
        best
    }

    // Lexicographically smallest zero-free string of exactly this length
    // covering r: place the smallest digit that leaves a remainder the
    // positions still open can cover.
    fn build(length: usize, mut r: [usize; 4], vec: &[[usize; 4]; 10]) -> String {
        let mut out = String::with_capacity(length);
        for pos in 0..length {
            for d in 1..=9usize {
                let mut nxt = [0usize; 4];
                for k in 0..4 {
                    nxt[k] = r[k].saturating_sub(vec[d][k]);
                }
                if Self::min_digits(&nxt) <= length - pos - 1 {
                    out.push((b'0' + d as u8) as char);
                    r = nxt;
                    break;
                }
            }
        }
        out
    }
}
