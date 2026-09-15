impl Solution {
    // Sorting by (digit sum, value) fixes the target order; mapping
    // every element to its target position turns the rearrangement
    // into a permutation, and the minimum number of swaps is
    // n - (number of cycles): each cycle of length L costs L - 1.
    // The cycle walk is iterative -- n reaches 10^5, past any safe
    // recursion depth.
    pub fn min_swaps(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let digit_sum = |mut v: i32| -> i32 {
            let mut s = 0;
            while v > 0 {
                s += v % 10;
                v /= 10;
            }
            s
        };
        let mut order: Vec<usize> = (0..n).collect();
        order.sort_by_key(|&i| (digit_sum(nums[i]), nums[i]));
        let mut pos = vec![0usize; n];
        for (target, &i) in order.iter().enumerate() {
            pos[i] = target;
        }
        let mut swaps = 0i32;
        let mut visited = vec![false; n];
        for i in 0..n {
            if visited[i] {
                continue;
            }
            let mut length = 0i32;
            let mut j = i;
            while !visited[j] {
                visited[j] = true;
                j = pos[j];
                length += 1;
            }
            swaps += length - 1;
        }
        swaps
    }
}
