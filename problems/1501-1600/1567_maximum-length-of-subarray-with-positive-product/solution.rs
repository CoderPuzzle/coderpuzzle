impl Solution {
    pub fn get_max_len(nums: Vec<i32>) -> i32 {
        // `pos_len` / `neg_len` are the lengths of the longest subarrays
        // ending at the current index whose product is positive / negative.
        // A zero breaks any run, so both reset to 0. A positive value keeps
        // every sign as-is: `pos_len` always extends, `neg_len` only extends
        // if there already was a negative-ending run. A negative value flips
        // every sign, so the two lengths swap roles (each extended by one)
        // before moving on: what used to end negative now ends positive, and
        // what used to end positive now ends negative.
        let mut pos_len = 0;
        let mut neg_len = 0;
        let mut max_len = 0;
        for x in nums {
            if x == 0 {
                pos_len = 0;
                neg_len = 0;
            } else if x > 0 {
                pos_len += 1;
                neg_len = if neg_len > 0 { neg_len + 1 } else { 0 };
            } else {
                let new_pos_len = if neg_len > 0 { neg_len + 1 } else { 0 };
                let new_neg_len = pos_len + 1;
                pos_len = new_pos_len;
                neg_len = new_neg_len;
            }
            max_len = max_len.max(pos_len);
        }
        max_len
    }
}
