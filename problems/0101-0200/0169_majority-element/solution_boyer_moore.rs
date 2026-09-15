impl Solution {
    pub fn majority_element(nums: Vec<i32>) -> i32 {
        // Boyer-Moore voting: the majority outnumbers all others combined, so
        // pairing each of its votes against one opposing vote still leaves a
        // survivor — no explicit counting needed.
        let mut candidate = 0;
        let mut count = 0;
        for &num in &nums {
            if count == 0 {
                // Zero count means a self-cancelling segment just ended;
                // adopt the current element afresh.
                candidate = num;
                count = 1;
            } else if num == candidate {
                count += 1;
            } else {
                // A differing element cancels one candidate vote.
                count -= 1;
            }
        }
        // A majority is guaranteed to exist, so the standing candidate is it.
        candidate
    }
}
