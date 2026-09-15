impl Solution {
    pub fn largest_palindrome(n: i32, k: i32) -> String {
        // A palindrome of length n is pinned down by its first ceil(n/2)
        // digits, and its remainder mod k is a digit-weight sum: half-position
        // j carries its own place value plus its mirror's (the odd-length
        // middle has no separate mirror), so everything runs on residues mod
        // k, never on the full number. For each suffix of the half, track
        // which residues the still-free digits can add; then scan the half
        // left to right, taking the largest digit whose leftover residue
        // stays reachable — the last free digit closes it exactly to zero.
        let n = n as usize;
        let k = k as usize;
        let m = (n + 1) / 2;
        let mut pow_small = vec![1 % k; m];
        for j in 1..m {
            pow_small[j] = pow_small[j - 1] * 10 % k;
        }
        let mut base = 1 % k;
        for _ in 0..(n - m) {
            base = base * 10 % k;
        }
        let weights: Vec<usize> = (0..m)
            .map(|j| {
                let mirror = if 2 * j != n - 1 { pow_small[j] } else { 0 };
                (base * pow_small[m - 1 - j] + mirror) % k
            })
            .collect();
        let full = (1u16 << k) - 1;

        let mut cache = vec![0xffffu16; 512 * 10];
        let mut reachable = vec![0u16; m + 1];
        reachable[m] = 1;
        for j in (0..m).rev() {
            let mask = reachable[j + 1];
            let w = weights[j];
            let key = mask as usize * 10 + w;
            if cache[key] == 0xffff {
                let mut out = mask;
                let mut shift = 0;
                for _ in 0..9 {
                    shift = (shift + w) % k;
                    out |= if shift == 0 {
                        mask
                    } else {
                        ((mask << shift) | (mask >> (k - shift))) & full
                    };
                }
                cache[key] = out;
            }
            reachable[j] = cache[key];
        }

        let mut need = 0usize;
        let mut half = vec![b'0'; m];
        for j in 0..m {
            let low = if j == 0 { 1 } else { 0 };
            for d in (low..=9usize).rev() {
                let rest = (((need as i32 - d as i32 * weights[j] as i32).rem_euclid(k as i32)) as usize);
                if reachable[j + 1] >> rest & 1 == 1 {
                    need = rest;
                    half[j] = b'0' + d as u8;
                    break;
                }
            }
        }
        let body_len = if n % 2 == 0 { m } else { m - 1 };
        let mut result = half.clone();
        result.extend(half[..body_len].iter().rev());
        String::from_utf8(result).unwrap_or_default()
    }
}
