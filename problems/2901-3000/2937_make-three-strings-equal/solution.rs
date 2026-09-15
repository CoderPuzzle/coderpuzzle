impl Solution {
    // Deletions only ever shorten a string from the right, so the final
    // shared string is a prefix of each input — and it must be
    // non-empty. Every string is trimmed to the longest common prefix,
    // and each deletion is forced, so the operation count is the sum of
    // the three overshoot lengths.
    pub fn find_minimum_operations(s1: String, s2: String, s3: String) -> i32 {
        let limit = s1.len().min(s2.len()).min(s3.len());
        let bytes1 = s1.as_bytes();
        let bytes2 = s2.as_bytes();
        let bytes3 = s3.as_bytes();
        let mut common: usize = 0;
        while common < limit && bytes1[common] == bytes2[common] && bytes2[common] == bytes3[common] {
            common += 1;
        }
        if common == 0 {
            return -1;
        }
        (s1.len() + s2.len() + s3.len() - 3 * common) as i32
    }
}
