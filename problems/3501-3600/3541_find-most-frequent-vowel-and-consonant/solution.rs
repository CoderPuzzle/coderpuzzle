impl Solution {
    pub fn max_freq_sum(s: String) -> i32 {
        // One pass into 26 buckets, then the max over the vowel buckets and
        // the max over the consonant buckets. Missing letters (no vowels or
        // no consonants at all) stay at 0, matching the statement's rule.
        let mut counts = [0usize; 26];
        for ch in s.bytes() {
            counts[(ch - b'a') as usize] += 1;
        }
        let mut best_vowel = 0usize;
        let mut best_consonant = 0usize;
        for i in 0..26 {
            if matches!(i, 0 | 4 | 8 | 14 | 20) {
                best_vowel = best_vowel.max(counts[i]);
            } else {
                best_consonant = best_consonant.max(counts[i]);
            }
        }
        (best_vowel + best_consonant) as i32
    }
}
