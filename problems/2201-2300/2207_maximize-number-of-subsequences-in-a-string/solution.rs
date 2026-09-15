impl Solution {
    // An inserted pattern[0] pairs with the most pattern[1]'s at the very
    // front of text, and an inserted pattern[1] with the most pattern[0]'s
    // at the very end — any interior spot sees only a subset of one of
    // those sides. So the answer is the pairs already in text plus the
    // larger of the two letter counts, and one sweep gathers all three
    // numbers: each pattern[1] is charged with the pattern[0]'s before
    // it. When both pattern letters are equal the same sweep yields
    // k*(k-1)/2 pairs plus a gain of k, which is exactly what one extra
    // copy of that letter adds.
    pub fn maximum_subsequence_count(text: String, pattern: String) -> i64 {
        let (first, second) = (pattern.as_bytes()[0], pattern.as_bytes()[1]);
        let (mut count_first, mut count_second, mut pairs) = (0i64, 0i64, 0i64);
        for &ch in text.as_bytes() {
            if ch == second {
                pairs += count_first;
                count_second += 1;
            }
            if ch == first {
                count_first += 1;
            }
        }
        pairs + count_first.max(count_second)
    }
}
