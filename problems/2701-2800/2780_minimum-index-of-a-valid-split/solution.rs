use std::collections::HashMap;

impl Solution {
    pub fn minimum_index(nums: Vec<i32>) -> i32 {
        // One pass tallies every value; the promised sole dominant is the
        // value whose tally ends largest. Only the dominant can anchor a
        // valid split: a value dominating both halves holds more than half
        // of each, and doubling and adding the two inequalities gives more
        // than half of the whole array.
        let mut counts: HashMap<i32, i32> = HashMap::new();
        let mut dominant = nums[0];
        let mut frequency = 0;
        for &num in &nums {
            let tally = counts.entry(num).or_insert(0);
            *tally += 1;
            if *tally > frequency {
                dominant = num;
                frequency = *tally;
            }
        }
        // Second sweep carries prefix, the count of dominant copies so far.
        // Splitting after i, the prefix holds i + 1 elements and the suffix
        // n - i - 1; both comparisons are strict, so a tally tying its
        // half's length does not dominate.
        let mut prefix = 0;
        let n = nums.len() as i32;
        for i in 0..n - 1 {
            if nums[i as usize] == dominant {
                prefix += 1;
            }
            if prefix * 2 > i + 1 && (frequency - prefix) * 2 > n - i - 1 {
                return i;
            }
        }
        -1
    }
}
