impl Solution {
    pub fn special_triplets(nums: Vec<i32>) -> i32 {
        // Sweep the middle index j while keeping counts of every value
        // strictly left and strictly right of it: j with v = nums[j]
        // contributes left[2v] * right[2v]. Counts fit in i32 but the
        // product reaches 2.5 * 10^9 and the total up to C(10^5, 3) ≈
        // 1.7 * 10^14, so the accumulator is i64; the modulo lands once
        // at the end.
        let mut right = vec![0i64; 200001];
        for &x in &nums {
            right[x as usize] += 1;
        }
        let mut left = vec![0i64; 200001];
        let mut ans: i64 = 0;
        for &v in &nums {
            right[v as usize] -= 1;
            ans += left[2 * v as usize] * right[2 * v as usize];
            left[v as usize] += 1;
        }
        (ans % 1_000_000_007) as i32
    }
}
