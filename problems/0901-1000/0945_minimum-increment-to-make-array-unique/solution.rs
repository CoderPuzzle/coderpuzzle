impl Solution {
    pub fn min_increment_for_unique(mut nums: Vec<i32>) -> i64 {
        // Sorted, an element never regrets landing on the first free value
        // above its predecessor's final value — anything higher wastes moves.
        nums.sort();
        let mut moves: i64 = 0;
        let mut prev = nums[0];
        for i in 1..nums.len() {
            let need = prev + 1 - nums[i];
            if need > 0 {
                moves += i64::from(need);
                prev = nums[i] + need;
            } else {
                prev = nums[i];
            }
        }
        moves
    }
}
