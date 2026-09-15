impl Solution {
    pub fn next_greatest_letter(letters: Vec<String>, target: String) -> String {
        // Upper bound over the half-open range [lo, hi): the first index
        // whose letter is strictly greater than target. The wrap below
        // handles the case where no letter qualifies.
        let mut lo = 0;
        let mut hi = letters.len();
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if letters[mid].as_str() <= target.as_str() {
                // At or below target — not strictly greater — so the answer
                // sits strictly right of mid.
                lo = mid + 1;
            } else {
                // letters[mid] > target keeps mid a live candidate.
                hi = mid;
            }
        }
        // No letter is strictly greater: wrap to the first letter.
        if lo == letters.len() {
            return letters[0].clone();
        }
        letters[lo].clone()
    }
}
