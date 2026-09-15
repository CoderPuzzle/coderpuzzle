use std::collections::HashMap;

impl Solution {
    // Values, frequencies, and counts of frequencies are all at most 10^5,
    // so i32 arithmetic carries everything without overflow.
    pub fn first_unique_freq(nums: Vec<i32>) -> i32 {
        let mut freq: HashMap<i32, i32> = HashMap::new();
        for &x in &nums {
            *freq.entry(x).or_insert(0) += 1;
        }
        // freqCount maps each frequency to how many distinct values share
        // it; a value's frequency is unique exactly when that count is 1.
        let mut freq_count: HashMap<i32, i32> = HashMap::new();
        for &f in freq.values() {
            *freq_count.entry(f).or_insert(0) += 1;
        }
        // Scan in index order: the first element whose value has a unique
        // frequency wins, even if a "smaller" qualifying value appears later.
        for &x in &nums {
            if freq_count[&freq[&x]] == 1 {
                return x;
            }
        }
        -1
    }
}
