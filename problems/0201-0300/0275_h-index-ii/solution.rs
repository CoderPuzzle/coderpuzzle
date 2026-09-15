impl Solution {
    // The array is sorted, so exactly n - i papers (index i to the end) hold
    // citations[i] or more: the test citations[i] >= n - i asks whether
    // h = n - i is achievable. citations never decreases while n - i
    // strictly does, so the test reads false ... false, true ... true along
    // the array — bisect for its first true.
    pub fn h_index(citations: Vec<i32>) -> i32 {
        let n = citations.len();
        let mut lo = 0;
        let mut hi = n;
        while lo < hi {
            let mid = (lo + hi) / 2;
            if citations[mid] < (n - mid) as i32 {
                // Too few citations at mid, and every smaller index is
                // worse: the first qualifying paper sits strictly right.
                lo = mid + 1;
            } else {
                // mid itself qualifies: the first one is at mid or left.
                hi = mid;
            }
        }
        // n - lo papers from lo on each have >= n - lo citations; when
        // nothing qualifies lo == n and h falls out as 0.
        (n - lo) as i32
    }
}
