impl Solution {
    pub fn subarrays_with_more_ones_than_zeroes(nums: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let size = 2 * nums.len() + 3;
        let offset = nums.len() + 1;
        let mut bit = vec![0_i64; size];

        Self::add(&mut bit, offset);
        let mut prefix = 0_i32;
        let mut answer = 0_i64;
        for value in nums {
            prefix += if value == 1 { 1 } else { -1 };
            let index = (prefix + offset as i32) as usize;
            answer = (answer + Self::query(&bit, index - 1)) % MOD;
            Self::add(&mut bit, index);
        }
        answer as i32
    }

    fn add(bit: &mut [i64], mut index: usize) {
        while index < bit.len() {
            bit[index] += 1;
            index += index & index.wrapping_neg();
        }
    }

    fn query(bit: &[i64], mut index: usize) -> i64 {
        let mut total = 0_i64;
        while index > 0 {
            total += bit[index];
            index -= index & index.wrapping_neg();
        }
        total
    }
}
