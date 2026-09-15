impl Solution {
    pub fn third_max(nums: Vec<i32>) -> i32 {
        // Option slots: None marks "not yet filled", so i32::MIN itself is
        // a legal value and no sentinel constant is needed.
        let mut first: Option<i32> = None;
        let mut second: Option<i32> = None;
        let mut third: Option<i32> = None;
        for &value in &nums {
            // A repeat of an already-tracked value changes nothing.
            if first == Some(value) || second == Some(value) || third == Some(value) {
                continue;
            }
            if first.map_or(true, |slot| value > slot) {
                third = second;
                second = first;
                first = Some(value);
            } else if second.map_or(true, |slot| value > slot) {
                third = second;
                second = Some(value);
            } else if third.map_or(true, |slot| value > slot) {
                third = Some(value);
            }
        }
        // No third distinct maximum: fall back to the maximum.
        third.unwrap_or(first.unwrap())
    }
}
