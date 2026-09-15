impl Solution {
    pub fn lex_smallest(s: String) -> String {
        let sb = s.as_bytes();
        let n = sb.len();
        let mut tb = vec![0u8; n];
        for i in 0..n {
            tb[i] = sb[n - 1 - i];
        }
        // Double rolling hashes over s and over its reverse: each candidate
        // glues at most two slices of these two strings, so any candidate
        // prefix hashes in O(1) from the tables below. reverse(s[:k]) is the
        // slice of the reversed string at offset n-k; reverse(s[n-k:]) sits
        // at offset 0.
        const M1: i64 = 1_000_000_007;
        const M2: i64 = 998_244_353;
        const B1: i64 = 131;
        const B2: i64 = 137;
        let mut pw1 = vec![1i64; n + 1];
        let mut pw2 = vec![1i64; n + 1];
        let mut hs1 = vec![0i64; n + 1];
        let mut hs2 = vec![0i64; n + 1];
        let mut ht1 = vec![0i64; n + 1];
        let mut ht2 = vec![0i64; n + 1];
        for i in 0..n {
            let v = (sb[i] - b'a' + 1) as i64;
            let w = (tb[i] - b'a' + 1) as i64;
            pw1[i + 1] = pw1[i] * B1 % M1;
            pw2[i + 1] = pw2[i] * B2 % M2;
            hs1[i + 1] = (hs1[i] * B1 + v) % M1;
            hs2[i + 1] = (hs2[i] * B2 + v) % M2;
            ht1[i + 1] = (ht1[i] * B1 + w) % M1;
            ht2[i + 1] = (ht2[i] * B2 + w) % M2;
        }
        let sub_s = |l: usize, length: usize| -> (i64, i64) {
            (
                (hs1[l + length] - hs1[l] * pw1[length] % M1 + M1) % M1,
                (hs2[l + length] - hs2[l] * pw2[length] % M2 + M2) % M2,
            )
        };
        let sub_t = |l: usize, length: usize| -> (i64, i64) {
            (
                (ht1[l + length] - ht1[l] * pw1[length] % M1 + M1) % M1,
                (ht2[l + length] - ht2[l] * pw2[length] % M2 + M2) % M2,
            )
        };
        // Hash pair of a candidate's first `length` characters: kind 0 is
        // reverse(s[:k]) + s[k:] (slices t[:k] then s[k:]), kind 1 is
        // s[:n-k] + reverse(s[n-k:]) (slices s[:head] then t[:head]).
        let pref = |kind: usize, k: usize, length: usize| -> (i64, i64) {
            if kind == 0 {
                if length <= k {
                    return sub_t(n - k, length);
                }
                let (a1, a2) = sub_t(n - k, k);
                let (c1, c2) = sub_s(k, length - k);
                ((a1 * pw1[length - k] + c1) % M1, (a2 * pw2[length - k] + c2) % M2)
            } else {
                let head = n - k;
                if length <= head {
                    return sub_s(0, length);
                }
                let (a1, a2) = sub_s(0, head);
                let (c1, c2) = sub_t(0, length - head);
                ((a1 * pw1[length - head] + c1) % M1, (a2 * pw2[length - head] + c2) % M2)
            }
        };
        let char_at = |kind: usize, k: usize, i: usize| -> u8 {
            // Kind 0 walks the reversed prefix backwards through s; past the
            // boundary both kinds continue with s at the same index.
            if kind == 0 {
                if i < k {
                    sb[k - 1 - i]
                } else {
                    sb[i]
                }
            } else {
                let head = n - k;
                if i < head {
                    sb[i]
                } else {
                    tb[i - head]
                }
            }
        };
        let probe = n.min(16);
        // True when this candidate sorts strictly before the champion.
        // Exact probe first: most contenders differ within a few chars.
        let beats = |kind: usize, k: usize, champ: (usize, usize)| -> bool {
            for i in 0..probe {
                let a = char_at(kind, k, i);
                let c = char_at(champ.0, champ.1, i);
                if a != c {
                    return a < c;
                }
            }
            // Indistinguishable near the front: settle the rest by hashed
            // longest-common-prefix binary search (probe chars already tie).
            let mut lo = probe;
            let mut hi = n;
            while lo < hi {
                let mid = (lo + hi + 1) / 2;
                let (a1, a2) = pref(kind, k, mid);
                let (c1, c2) = pref(champ.0, champ.1, mid);
                if a1 == c1 && a2 == c2 {
                    lo = mid;
                } else {
                    hi = mid - 1;
                }
            }
            if lo == n {
                return false;
            }
            char_at(kind, k, lo) < char_at(champ.0, champ.1, lo)
        };
        // Only candidates starting with the smallest letter can win.
        let smallest = *sb.iter().min().unwrap();
        let mut best_kind = 0usize;
        let mut best_k = 0usize;
        for i in 0..n {
            if sb[i] == smallest && (best_k == 0 || beats(0, i + 1, (best_kind, best_k))) {
                best_kind = 0;
                best_k = i + 1;
            }
        }
        if sb[0] == smallest {
            for k in 2..=n {
                if beats(1, k, (best_kind, best_k)) {
                    best_kind = 1;
                    best_k = k;
                }
            }
        }
        // Materialize only the winning candidate.
        let mut out = Vec::with_capacity(n);
        if best_kind == 0 {
            out.extend(sb[..best_k].iter().rev());
            out.extend_from_slice(&sb[best_k..]);
        } else {
            out.extend_from_slice(&sb[..n - best_k]);
            out.extend(sb[n - best_k..].iter().rev());
        }
        String::from_utf8(out).unwrap()
    }
}
