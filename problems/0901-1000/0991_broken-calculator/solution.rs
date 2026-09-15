// Work backwards from target: reverse double is halve (only legal on an
// even number) and reverse subtract-1 is add-1. While target sits above
// startValue, an odd target must add 1 before it can halve, and an even
// target halves at once — two adds pushed before a halve equal one add
// after it, so deferring every add is optimal. Below startValue only
// plain subtractions remain.
impl Solution {
    pub fn broken_calc(startValue: i32, target: i32) -> i32 {
        let (mut start, mut value) = (i64::from(startValue), i64::from(target));
        let mut ops: i64 = 0;
        while value > start {
            if value % 2 != 0 {
                value += 1;
            } else {
                value /= 2;
            }
            ops += 1;
        }
        let total: i64 = ops + start - value;
        total as i32
    }
}
