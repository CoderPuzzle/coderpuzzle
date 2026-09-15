impl Solution {
    pub fn shortest_matching_substring(s: String, p: String) -> i32 {
        let parts: Vec<&str> = p.split('*').collect();
        let (a, b, c) = (parts[0], parts[1], parts[2]);
        let occ_a: Vec<i64> = if a.is_empty() {
            Vec::new()
        } else {
            Self::find_all(&s, a)
        };
        let occ_b: Vec<i64> = if b.is_empty() {
            Vec::new()
        } else {
            Self::find_all(&s, b)
        };
        let occ_c: Vec<i64> = if c.is_empty() {
            Vec::new()
        } else {
            Self::find_all(&s, c)
        };

        // segs: (length, occurrences)
        let mut segs: Vec<(i64, Vec<i64>)> = Vec::new();
        if !a.is_empty() {
            segs.push((a.len() as i64, occ_a));
        }
        if !b.is_empty() {
            segs.push((b.len() as i64, occ_b));
        }
        if !c.is_empty() {
            segs.push((c.len() as i64, occ_c));
        }

        if segs.is_empty() {
            return 0;
        }
        if segs.len() == 1 {
            return if segs[0].1.is_empty() { -1 } else { segs[0].0 as i32 };
        }
        if segs.len() == 2 {
            let (l1, occ1) = (&segs[0].0, &segs[0].1);
            let (l2, occ2) = (&segs[1].0, &segs[1].1);
            let mut best: Option<i64> = None;
            for &j in occ2 {
                let idx = occ1.partition_point(|&x| x <= j - l1) as i64 - 1; // bisect_right - 1
                if idx >= 0 {
                    let cand = j + l2 - occ1[idx as usize];
                    if best.is_none() || cand < best.unwrap() {
                        best = Some(cand);
                    }
                }
            }
            return best.map(|v| v as i32).unwrap_or(-1);
        }
        // three non-empty segments
        let (l1, occ1) = (&segs[0].0, &segs[0].1);
        let (l2, occ2) = (&segs[1].0, &segs[1].1);
        let (l3, occ3) = (&segs[2].0, &segs[2].1);
        let mut best_i_for_j: Vec<Option<i64>> = Vec::with_capacity(occ2.len());
        for &j in occ2 {
            let idx = occ1.partition_point(|&x| x <= j - l1) as i64 - 1;
            best_i_for_j.push(if idx >= 0 { Some(occ1[idx as usize]) } else { None });
        }
        let mut best: Option<i64> = None;
        for &k in occ3 {
            let j_idx = occ2.partition_point(|&x| x <= k - l2) as i64 - 1;
            if j_idx >= 0 {
                if let Some(bi) = best_i_for_j[j_idx as usize] {
                    let cand = k + l3 - bi;
                    if best.is_none() || cand < best.unwrap() {
                        best = Some(cand);
                    }
                }
            }
        }
        best.map(|v| v as i32).unwrap_or(-1)
    }

    fn find_all(s: &str, pat: &str) -> Vec<i64> {
        let mut result = Vec::new();
        let mut start = 0usize;
        while let Some(off) = s[start..].find(pat) {
            let idx = start + off;
            result.push(idx as i64);
            start = idx + 1;
        }
        result
    }
}
