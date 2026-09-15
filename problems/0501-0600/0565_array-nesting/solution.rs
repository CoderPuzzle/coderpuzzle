impl Solution {
    pub fn array_nesting(nums: Vec<i32>) -> i32 {
        // A permutation makes i -> nums[i] a graph where every node has
        // exactly one successor and one predecessor, so the array splits
        // into disjoint cycles; s[k] is exactly the cycle containing k, and
        // every member of that cycle generates the same-length set.
        let mut seen = vec![false; nums.len()];
        let mut longest = 0;
        for start in 0..nums.len() {
            if seen[start] {
                continue;
            }
            let mut length = 0;
            let mut index = start;
            while !seen[index] {
                seen[index] = true;
                index = nums[index] as usize;
                length += 1;
            }
            longest = longest.max(length);
        }
        longest
    }
}
