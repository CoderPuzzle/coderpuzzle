impl Solution {
    pub fn next_permutation(mut nums: Vec<i32>) -> Vec<i32> {
        // Scan from the right for the pivot: the first element smaller than
        // its successor. Everything after it is a non-increasing suffix, the
        // largest arrangement of that tail, so the pivot is the only position
        // that can still grow while the prefix stays fixed. A signed index
        // keeps -1 meaningful: no pivot at all.
        let mut pivot = nums.len() as isize - 2;
        while pivot >= 0 && nums[pivot as usize] >= nums[pivot as usize + 1] {
            pivot -= 1;
        }
        if pivot >= 0 {
            // The rightmost value exceeding the pivot is the smallest one
            // that does; the >= above means equals are stepped over.
            let p = pivot as usize;
            let mut successor = nums.len() - 1;
            while nums[successor] <= nums[p] {
                successor -= 1;
            }
            nums.swap(p, successor);
        }
        // The suffix is still non-increasing after the swap, so reversing it
        // yields the smallest possible tail. No pivot means the whole array
        // was the last permutation, and the full reverse wraps to the first.
        let start = (pivot + 1) as usize;
        nums[start..].reverse();
        // Ownership handed over the whole allocation, so every rearrangement
        // reused it in place — no second vector was ever built.
        nums
    }
}
