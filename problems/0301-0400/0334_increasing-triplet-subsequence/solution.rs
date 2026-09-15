impl Solution {
    pub fn increasing_triplet(nums: Vec<i32>) -> bool {
        let mut first: i64 = i64::MAX;
        let mut second: i64 = i64::MAX;
        for value in nums {
            let value = value as i64;
            if value <= first {
                first = value;
            } else if value <= second {
                second = value;
            } else {
                return true;
            }
        }
        false
    }
}
