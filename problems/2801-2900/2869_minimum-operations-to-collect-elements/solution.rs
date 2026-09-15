impl Solution {
    pub fn min_operations(nums: Vec<i32>, k: i32) -> i32 {
        // Operations only ever drop the last element, so after t operations
        // the collection is exactly the suffix of length t.
        let n = nums.len() as i32;
        let mut marked = vec![false; (k + 1) as usize];
        let mut collected = 0;
        for i in (0..n).rev() {
            let value = nums[i as usize];
            if value <= k && !marked[value as usize] {
                marked[value as usize] = true;
                collected += 1;
                if collected == k {
                    // The wanted values 1..k all sit in the removed suffix.
                    return n - i;
                }
            }
        }
        // Unreachable for valid inputs: 1..k is guaranteed collectible.
        n
    }
}
