impl Solution {
    pub fn count_smaller(nums: Vec<i32>) -> Vec<i32> {
        const OFFSET: i32 = 10002; // maps nums[i] in [-10^4, 10^4] to a positive index
        const SIZE: usize = 20005;
        let mut bit = vec![0i32; SIZE + 1];

        fn update(bit: &mut [i32], size: usize, mut i: usize, delta: i32) {
            while i <= size {
                bit[i] += delta;
                i += i & i.wrapping_neg();
            }
        }
        fn query(bit: &[i32], mut i: usize) -> i32 {
            let mut total = 0;
            while i > 0 {
                total += bit[i];
                i -= i & i.wrapping_neg();
            }
            total
        }

        let mut result = vec![0i32; nums.len()];
        for k in (0..nums.len()).rev() {
            let index = (nums[k] + OFFSET) as usize;
            result[k] = query(&bit, index - 1);
            update(&mut bit, SIZE, index, 1);
        }
        result
    }
}
