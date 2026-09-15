impl Solution {
    // Three distinct positions with three distinct values order uniquely by
    // index, so for each value v the valid triplets using v as the
    // value-sorted middle are left * freq[v] * right. Values lie in
    // [1, 1000], so a fixed table indexed by value replaces the map.
    pub fn unequal_triplets(nums: Vec<i32>) -> i32 {
        let mut count = vec![0i32; 1001];
        for &value in nums.iter() {
            count[value as usize] += 1;
        }
        let total = nums.len() as i32;
        let mut left = 0;
        let mut answer = 0;
        for value in 1..=1000usize {
            let freq = count[value];
            if freq != 0 {
                answer += left * freq * (total - left - freq);
                left += freq;
            }
        }
        answer
    }
}
