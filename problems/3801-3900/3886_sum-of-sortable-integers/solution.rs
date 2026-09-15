impl Solution {
    pub fn sortable_integers(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut ordered = nums.clone();
        ordered.sort_unstable();
        let mut total = 0;
        let mut k = 1;
        while k <= n {
            if n % k == 0 {
                let mut ok = true;
                let mut start = 0;
                while start < n {
                    if !Self::is_rotation(&nums[start..start + k], &ordered[start..start + k]) {
                        ok = false;
                        break;
                    }
                    start += k;
                }
                if ok {
                    total += k as i32;
                }
            }
            k += 1;
        }
        total
    }

    // A sequence is a cyclic rotation of the block exactly when it appears
    // inside `block + block`; a KMP scan answers that in O(k).
    fn is_rotation(block: &[i32], target: &[i32]) -> bool {
        let k = block.len();
        let mut text = Vec::with_capacity(2 * k);
        text.extend_from_slice(block);
        text.extend_from_slice(block);
        let mut pi = vec![0usize; k];
        for i in 1..k {
            let mut j = pi[i - 1];
            while j > 0 && target[i] != target[j] {
                j = pi[j - 1];
            }
            if target[i] == target[j] {
                j += 1;
            }
            pi[i] = j;
        }
        let mut j = 0usize;
        for &value in &text {
            while j > 0 && value != target[j] {
                j = pi[j - 1];
            }
            if value == target[j] {
                j += 1;
            }
            if j == k {
                return true;
            }
        }
        false
    }
}
