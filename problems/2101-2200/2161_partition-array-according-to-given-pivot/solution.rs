// Stable three-way partition: gather each comparison class in its original
// order and concatenate, which preserves the relative order inside the less
// and greater groups by construction.
impl Solution {
    pub fn pivot_array(nums: Vec<i32>, pivot: i32) -> Vec<i32> {
        let mut less = Vec::with_capacity(nums.len());
        let mut equal = Vec::new();
        let mut greater = Vec::new();
        for &value in &nums {
            if value < pivot {
                less.push(value);
            } else if value > pivot {
                greater.push(value);
            } else {
                equal.push(value);
            }
        }
        less.extend(equal);
        less.extend(greater);
        less
    }
}
