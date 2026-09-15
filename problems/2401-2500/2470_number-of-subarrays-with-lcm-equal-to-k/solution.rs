impl Solution {
    pub fn subarray_lcm(nums: Vec<i32>, k: i32) -> i32 {
        // Anchor the left endpoint and sweep right, carrying the running
        // lcm of nums[i..j]: it only ever grows (each new element can
        // raise it, never lower it). Once it exceeds k, every later lcm
        // in this sweep is larger still, so k is unreachable — break.
        // Each j where the lcm equals k is one counted subarray.
        let gcd = |mut a: i32, mut b: i32| -> i32 {
            while b != 0 {
                let t = a % b;
                a = b;
                b = t;
            }
            a
        };
        let n = nums.len();
        let mut total = 0i64;
        for i in 0..n {
            let mut l = 1i32;
            for j in i..n {
                l = l / gcd(l, nums[j]) * nums[j];
                if l > k {
                    break;
                }
                if l == k {
                    total += 1;
                }
            }
        }
        total as i32
    }
}
