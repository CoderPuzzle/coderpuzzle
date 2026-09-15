impl Solution {
    pub fn max_substring_length(s: String) -> i32 {
        let bytes = s.as_bytes();
        let n = bytes.len();
        let mut first = [usize::MAX; 26];
        let mut last = [0usize; 26];
        // Prefix counts make "does letter d occur inside s[l..r]" a plain
        // count difference, driving both the closure cascade and the
        // final validation.
        let mut counts: Vec<[i32; 26]> = Vec::with_capacity(n + 1);
        counts.push([0i32; 26]);
        for i in 0..n {
            let mut row = counts[i];
            let d = (bytes[i] - b'a') as usize;
            row[d] += 1;
            counts.push(row);
            if first[d] == usize::MAX {
                first[d] = i;
            }
            last[d] = i;
        }

        // A self-contained window always starts at the first occurrence
        // of its own leading character, so only those positions are
        // anchors.
        let mut best: i64 = -1;
        for c in 0..26usize {
            if first[c] == usize::MAX {
                continue;
            }
            let l = first[c];
            let mut r = last[(bytes[l] - b'a') as usize];
            loop {
                // Stabilize: extend the right end until every letter
                // occurring inside s[l..r] is fully contained there,
                // tracking the earliest first occurrence among them.
                let min_first;
                loop {
                    let mut new_r = r;
                    let mut mf = usize::MAX;
                    for d in 0..26usize {
                        if counts[r + 1][d] - counts[l][d] > 0 {
                            if last[d] > new_r {
                                new_r = last[d];
                            }
                            if first[d] < mf {
                                mf = first[d];
                            }
                        }
                    }
                    if new_r == r {
                        min_first = mf;
                        break;
                    }
                    r = new_r;
                }
                if min_first >= l && !(l == 0 && r == n - 1) {
                    best = best.max((r - l + 1) as i64);
                }
                if r == n - 1 {
                    break;
                }
                // Absorb the next closed block wholesale; unions of
                // consecutive blocks surface as further fixpoints.
                r = last[(bytes[r + 1] - b'a') as usize];
            }
        }
        best as i32
    }
}
