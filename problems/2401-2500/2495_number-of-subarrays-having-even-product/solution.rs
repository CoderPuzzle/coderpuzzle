impl Solution {
    pub fn even_product(nums: Vec<i32>) -> i64 {
        // A subarray has an even product iff it contains at least one even
        // element. Sweep the right endpoint left to right, remembering the
        // most recent even element's index: every left endpoint up to and
        // including it contributes lastEven + 1 even-product subarrays
        // ending here. The maximum n(n+1)/2 overflows i32, hence i64.
        let mut answer: i64 = 0;
        let mut last_even: i32 = -1;
        for (i, &x) in nums.iter().enumerate() {
            if x % 2 == 0 {
                last_even = i as i32;
            }
            answer += i64::from(last_even) + 1;
        }
        answer
    }
}
