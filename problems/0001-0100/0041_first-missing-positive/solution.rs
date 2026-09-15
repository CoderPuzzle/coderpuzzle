impl Solution {
    pub fn first_missing_positive(mut nums: Vec<i32>) -> i32 {
        let n = nums.len() as i32;
        let mut i = 0usize;
        // The answer lies in [1, n+1], so value v "belongs" at index v-1:
        // cyclic-sort each in-range value into its home slot.
        while i < nums.len() {
            // Swap while nums[i] is a positive in [1, n] whose home slot does
            // not already hold it. The != guard also makes duplicates harmless:
            // a duplicate finds its target occupied and stops swapping.
            while nums[i] >= 1 && nums[i] <= n && nums[(nums[i] - 1) as usize] != nums[i] {
                let target = (nums[i] - 1) as usize;
                nums.swap(i, target);
            }
            i += 1;
        }
        // Every swap places one value in its final position and none ever
        // leaves its slot, so total swaps <= n: O(n) amortized despite nesting.
        for j in 0..nums.len() {
            // First slot not holding its own value reveals the smallest
            // missing positive; all of 1..n present means the answer is n+1.
            if nums[j] != j as i32 + 1 {
                return j as i32 + 1;
            }
        }
        n + 1
    }
}
