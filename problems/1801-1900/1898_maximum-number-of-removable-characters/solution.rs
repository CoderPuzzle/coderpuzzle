impl Solution {
    pub fn maximum_removals(s: String, p: String, removable: Vec<i32>) -> i32 {
        let sb = s.as_bytes();
        let pb = p.as_bytes();
        // Classic greedy subsequence scan: skipping removed positions, match each
        // character of p at the earliest opportunity (optimal for containment).
        let still_subsequence = |k: usize| -> bool {
            let mut removed = vec![false; sb.len()];
            for i in 0..k {
                removed[removable[i] as usize] = true;
            }
            let mut pi = 0;
            for i in 0..sb.len() {
                if pi >= pb.len() {
                    break;
                }
                if !removed[i] && sb[i] == pb[pi] {
                    pi += 1;
                }
            }
            pi == pb.len()
        };

        // Feasibility is monotone (fewer deletions only restore characters), so the
        // workable k form an interval starting at 0 — binary search its right end.
        let mut lo = 0usize;
        let mut hi = removable.len();
        while lo < hi {
            // Upper-mid form keeps the search converging toward the largest feasible k.
            let mid = (lo + hi + 1) / 2;
            if still_subsequence(mid) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        lo as i32
    }
}
