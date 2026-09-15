impl Solution {
    // Elements are at most 10, so any lcm divides 2520 and any gcd is
    // at most 10: once the running product passes 25200 it can never
    // equal lcm * gcd again, so the inner walk can stop early.
    pub fn max_length(nums: Vec<i32>) -> i32 {
        fn gcd(a: i32, b: i32) -> i32 {
            if b == 0 {
                a
            } else {
                gcd(b, a % b)
            }
        }
        let n = nums.len();
        let mut ans = 0;
        for left in 0..n {
            let (mut prod, mut g, mut m) = (1i32, 0i32, 1i32);
            for right in left..n {
                let x = nums[right];
                prod *= x;
                g = gcd(g, x);
                m = m * x / gcd(m, x);
                if prod == m * g {
                    ans = ans.max((right - left + 1) as i32);
                } else if prod > 25200 {
                    break;
                }
            }
        }
        ans
    }
}
