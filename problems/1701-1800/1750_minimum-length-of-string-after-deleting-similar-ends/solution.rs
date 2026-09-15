impl Solution {
    pub fn minimum_length(s: String) -> i32 {
        // While both ends carry the same character, consume its full
        // run on each side in one sweep. The process is forced: shorter
        // strips only delay the same end state.
        let b = s.as_bytes();
        let (mut l, mut r) = (0usize, b.len() - 1);
        while l < r && b[l] == b[r] {
            let c = b[l];
            while l <= r && b[l] == c {
                l += 1;
            }
            while r >= l && b[r] == c {
                r -= 1;
            }
        }
        (r + 1 - l) as i32
    }
}
