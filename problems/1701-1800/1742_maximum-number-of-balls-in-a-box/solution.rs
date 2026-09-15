// Ball x is filed into box digit_sum(x), and with highLimit <= 10^5 no
// digit sum exceeds 45 (99999 -> 45), so a 46-slot counter indexed by
// digit sum covers every box the range can reach. Sweep once, strip digits
// with % 10 and / 10, bump the named slot, and answer with the fullest
// slot.
impl Solution {
    pub fn count_balls(low_limit: i32, high_limit: i32) -> i32 {
        let mut counts = [0i32; 46];
        for x in low_limit..=high_limit {
            let (mut v, mut s) = (x, 0);
            while v > 0 {
                s += v % 10;
                v /= 10;
            }
            counts[s as usize] += 1;
        }
        *counts.iter().max().unwrap()
    }
}
