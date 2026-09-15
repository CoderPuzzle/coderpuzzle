impl Solution {
    pub fn longest_decomposition(text: String) -> i32 {
        let bytes = text.as_bytes();
        let n = bytes.len();
        let mut count = 0;
        let mut left = 0usize;
        let mut right = n;
        while left < right {
            let mut size = 1usize;
            let mut matched = false;
            // prefix and suffix of equal size must not overlap
            while left + size <= right - size {
                if bytes[left..left + size] == bytes[right - size..right] {
                    // shortest matching pair first: an exchange argument
                    // shows splitting a longer pair here never lowers the count
                    count += 2;
                    left += size;
                    right -= size;
                    matched = true;
                    break;
                }
                size += 1;
            }
            if !matched {
                // no size pairs: the entire remainder is one final chunk
                count += 1;
                break;
            }
        }
        count
    }
}
