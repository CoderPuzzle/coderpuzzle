impl Solution {
    // Sorting is forced: the global minimum may only share a group with
    // the two values closest above it, and inductively every valid
    // division groups consecutive sorted values — so sort and check each
    // consecutive triple's spread (last minus first is the widest).
    pub fn divide_array(mut nums: Vec<i32>, k: i32) -> Vec<Vec<i32>> {
        nums.sort_unstable();
        let mut result = Vec::with_capacity(nums.len() / 3);
        for chunk in nums.chunks(3) {
            if chunk[2] - chunk[0] > k {
                return Vec::new();
            }
            result.push(chunk.to_vec());
        }
        result
    }
}
