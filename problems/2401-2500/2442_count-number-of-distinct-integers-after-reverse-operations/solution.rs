use std::collections::HashSet;

impl Solution {
    pub fn count_distinct_integers(nums: Vec<i32>) -> i32 {
        // The final array holds the originals plus one reversal per
        // original, so its distinct values are exactly the set
        // {originals} ∪ {reversals}. Reversal never changes the digit
        // count, so every value stays <= 10^6 and fits an i32. Leading
        // zeros vanish naturally in the arithmetic reversal: appending
        // "0" first ("01" for 10) leaves a leading zero that adds nothing.
        let mut seen = HashSet::with_capacity(2 * nums.len());
        for &value in nums.iter() {
            seen.insert(value);
            let mut reversed: i64 = 0;
            let mut rest = value;
            while rest > 0 {
                reversed = reversed * 10 + (rest % 10) as i64;
                rest /= 10;
            }
            seen.insert(reversed as i32);
        }
        seen.len() as i32
    }
}
