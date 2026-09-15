impl Solution {
    pub fn length_of_lis(nums: Vec<i32>, k: i32) -> i32 {
        // Max segment tree indexed by VALUE: leaf v holds the longest
        // valid subsequence seen so far that ends with value v. The
        // left-to-right scan keeps index order for free.
        let mut size: usize = 1;
        while size <= 100_000 {
            size *= 2;
        }
        let mut tree = vec![0; 2 * size];
        let mut answer = 0;
        for &x in &nums {
            // Predecessor must be a strictly smaller value within k, so
            // query [max(1, x-k), x-1]; extend the best of them by one.
            let left = (x - k).max(1) as usize;
            let right = (x - 1) as usize;
            let mut best = 0;
            let mut lo = left + size;
            let mut hi = right + size + 1;
            while lo < hi {
                if lo & 1 == 1 {
                    best = best.max(tree[lo]);
                    lo += 1;
                }
                if hi & 1 == 1 {
                    hi -= 1;
                    best = best.max(tree[hi]);
                }
                lo /= 2;
                hi /= 2;
            }
            let current = best + 1;
            // Climb from the leaf and stop once an ancestor is already
            // >= current: a shorter subsequence never overwrites a longer.
            let mut i = x as usize + size;
            while i >= 1 && tree[i] < current {
                tree[i] = current;
                i /= 2;
            }
            answer = answer.max(current);
        }
        answer
    }
}
