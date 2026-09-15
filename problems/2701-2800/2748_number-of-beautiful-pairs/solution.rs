impl Solution {
    pub fn count_beautiful_pairs(nums: Vec<i32>) -> i32 {
        // Euclid on two single digits; both are in 1..9 so this is tiny.
        fn gcd(mut a: i32, mut b: i32) -> i32 {
            while b != 0 {
                let t = a % b;
                a = b;
                b = t;
            }
            a
        }
        // A pair is beautiful iff the first digit of nums[i] and the last
        // digit of nums[j] are coprime; n <= 100, so test every pair.
        let mut count = 0;
        for i in 0..nums.len() {
            // Leading digit of nums[i] straight from its decimal string.
            let first = nums[i].to_string().chars().next().unwrap() as i32 - '0' as i32;
            for &last in &nums[i + 1..] {
                // Last digit is nonzero by the constraints, and gcd(1, d)
                // == 1 makes every pair with a first digit of 1 beautiful,
                // including two 1s.
                if gcd(first, last % 10) == 1 {
                    count += 1;
                }
            }
        }
        count
    }
}
