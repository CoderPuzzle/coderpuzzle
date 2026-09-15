impl Solution {
    pub fn sum_of_number_and_reverse(num: i32) -> bool {
        // Hint 1 is the whole story: the domain of candidates x with
        // 0 <= x <= num holds at most 100001 values, so a direct scan
        // settles every input. Each trial reverses x arithmetically --
        // leading zeros need no special case, since they simply add
        // nothing ("041" contributes 41). The sum x + rev(x) is at most
        // 2 * 10^5 and fits an i32.
        for x in 0..=num {
            let mut reversed = 0;
            let mut v = x;
            while v > 0 {
                reversed = reversed * 10 + v % 10;
                v /= 10;
            }
            if x + reversed == num {
                return true;
            }
        }
        false
    }
}
