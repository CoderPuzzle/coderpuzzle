impl Solution {
    pub fn subarray_gcd(nums: Vec<i32>, k: i32) -> i32 {
        // Anchor the left endpoint and sweep right, carrying the running
        // gcd of nums[i..j]: it only ever shrinks (each new element can
        // lower it, never raise it). Once k stops dividing the carried
        // gcd, every later gcd divides it too, so k is unreachable —
        // break. Each j where the gcd equals k is one counted subarray.
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
            let mut g = 0;
            for j in i..n {
                g = gcd(g, nums[j]);
                if g % k != 0 {
                    break;
                }
                if g == k {
                    total += 1;
                }
            }
        }
        total as i32
    }
}
