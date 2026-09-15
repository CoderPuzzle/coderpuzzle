impl Solution {
    // Every value sits below 2^maximumBit, so the running XOR does too,
    // and XOR with a fixed prefix is a bijection on that range: the
    // maximum of prefix ^ k is reached exactly at k = mask ^ prefix,
    // where mask = 2^maximumBit - 1. Removing the last element just
    // XORs it back out of the running total, so one backward walk
    // answers every prefix without recomputing anything.
    pub fn get_maximum_xor(nums: Vec<i32>, maximumBit: i32) -> Vec<i32> {
        let mask = (1i32 << maximumBit) - 1;
        let mut running = 0;
        for &value in &nums {
            running ^= value;
        }
        let mut answer = Vec::with_capacity(nums.len());
        for &value in nums.iter().rev() {
            answer.push(running ^ mask);
            running ^= value;
        }
        answer
    }
}
