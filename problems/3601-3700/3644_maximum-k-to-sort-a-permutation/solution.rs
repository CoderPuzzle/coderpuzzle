impl Solution {
    pub fn sort_permutation(nums: Vec<i32>) -> i32 {
        // A displaced value must take part in a swap, and every swap it
        // joins pins k inside that value's bits, so no k can exceed the AND
        // of the displaced values themselves.
        let mut ans = -1; // all bits set: the AND identity
        for (i, &x) in nums.iter().enumerate() {
            if x != i as i32 {
                ans &= x;
            }
        }
        // Sorting displaces nothing; the untouched sentinel clamps to the
        // required 0, and a real AND over values below n never goes negative.
        ans.max(0)
    }
}
