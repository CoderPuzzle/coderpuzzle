impl Solution {
    pub fn can_alice_win(nums: Vec<i32>) -> bool {
        // Alice must swallow an entire digit class, so the two running
        // totals decide everything: singles beat doubles under one play,
        // doubles beat singles under the other.
        let mut single = 0i32;
        let mut double_sum = 0i32;
        for &value in nums.iter() {
            if value < 10 {
                single += value;
            } else {
                double_sum += value;
            }
        }
        // An exact tie hands Bob whichever class Alice declines with an
        // equal sum, so only a strict difference wins.
        single != double_sum
    }
}
