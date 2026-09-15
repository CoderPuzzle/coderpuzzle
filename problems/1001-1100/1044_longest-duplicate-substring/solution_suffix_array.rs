impl Solution {
    pub fn longest_dup_substring(s: String) -> String {
        let bytes = s.as_bytes();
        let n = bytes.len();
        // Rank of each suffix by its first character alone; ranks only need
        // relative order, so the letter's alphabet index serves.
        let mut sa: Vec<usize> = (0..n).collect();
        let mut rank: Vec<i64> = bytes.iter().map(|&b| (b - b'a') as i64).collect();
        let mut next: Vec<i64> = vec![0; n];

        // Doubling sort: after the pass with step k, ranks order prefixes of
        // length 2k, so ceil(log2 n) passes settle the whole suffix order.
        // Each pass sorts on one packed key: the current rank scaled past
        // every possible second component, plus the rank of the suffix k
        // steps later, with 0 standing in for "past the end" so a suffix
        // that is a prefix of a longer one ranks strictly below it.
        let mut key: Vec<i64> = vec![0; n];
        let mut k = 1usize;
        while k < n {
            for i in 0..n {
                let second = if i + k < n { rank[i + k] + 1 } else { 0 };
                key[i] = rank[i] * (n as i64 + 27) + second;
            }
            sa.sort_by(|&x, &y| key[x].cmp(&key[y]));
            next[sa[0]] = 0;
            let mut r: i64 = 0;
            for p in 1..n {
                if key[sa[p]] != key[sa[p - 1]] {
                    r += 1;
                }
                next[sa[p]] = r;
            }
            std::mem::swap(&mut rank, &mut next);
            if r as usize == n - 1 {
                break; // every suffix distinct — the order is already final
            }
            k *= 2;
        }

        // Kasai's scan: walk the text positions left to right, matching each
        // suffix against its predecessor in sorted order. Dropping a leading
        // character from both sides of a match shortens it by at most one,
        // so a single extending counter h that only ever retreats by one per
        // step settles every LCP within 2n character comparisons.
        let mut pos_of: Vec<usize> = vec![0; n];
        for (p, &i) in sa.iter().enumerate() {
            pos_of[i] = p;
        }
        let mut best_length = 0usize;
        let mut best_start = 0usize;
        let mut h = 0usize;
        for i in 0..n {
            if pos_of[i] > 0 {
                let j = sa[pos_of[i] - 1];
                while i + h < n && j + h < n && bytes[i + h] == bytes[j + h] {
                    h += 1;
                }
                if h > best_length {
                    best_length = h;
                    best_start = i;
                }
                if h > 0 {
                    h -= 1;
                }
            } else {
                h = 0;
            }
        }

        if best_length == 0 {
            return String::new();
        }
        s[best_start..best_start + best_length].to_string()
    }
}
