impl Solution {
    pub fn replace_non_coprimes(nums: Vec<i32>) -> Vec<i32> {
        fn gcd(a: i64, b: i64) -> i64 {
            if b == 0 {
                a
            } else {
                gcd(b, a % b)
            }
        }
        let mut stack: Vec<i64> = Vec::with_capacity(nums.len());
        for num in nums {
            let mut current = num as i64;
            // keep absorbing into `current` while it shares a factor with
            // the processed value to its left
            while let Some(&top) = stack.last() {
                let g = gcd(top, current);
                if g == 1 {
                    break;
                }
                stack.pop();
                current = top / g * current;
            }
            stack.push(current);
        }
        stack.into_iter().map(|v| v as i32).collect()
    }
}
