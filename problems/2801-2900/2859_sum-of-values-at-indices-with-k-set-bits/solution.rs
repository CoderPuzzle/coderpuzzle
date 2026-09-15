impl Solution {
    pub fn sum_indices_with_k_set_bits(nums: Vec<i32>, k: i32) -> i32 {
        let mut answer = 0;
        for (index, &value) in nums.iter().enumerate() {
            let mut set_bits = 0;
            let mut rest = index as i32;
            while rest > 0 {
                rest &= rest - 1;
                set_bits += 1;
            }
            if set_bits == k {
                answer += value;
            }
        }
        answer
    }
}
