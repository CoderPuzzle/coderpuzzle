use std::collections::HashMap;

impl Solution {
    pub fn max_equal_freq(nums: Vec<i32>) -> i32 {
        let mut count: HashMap<i32, i32> = HashMap::new(); // value -> occurrences
        let mut freq: HashMap<i32, i32> = HashMap::new(); // count -> how many values
        let mut best = 0;
        for n in 1..=nums.len() {
            let value = nums[n - 1];
            let before = *count.get(&value).unwrap_or(&0);
            if before > 0 {
                let slot = freq.entry(before).or_insert(0);
                *slot -= 1;
                if *slot == 0 {
                    freq.remove(&before);
                }
            }
            *count.entry(value).or_insert(0) += 1;
            *freq.entry(before + 1).or_insert(0) += 1;

            // At most two frequency classes can ever be fixable.
            let mut a: i64 = -1;
            let mut b: i64 = -1;
            let mut classes = 0;
            for (&f, &c) in &freq {
                if c == 0 {
                    continue;
                }
                if classes == 0 {
                    a = f as i64;
                } else {
                    b = f as i64;
                }
                classes += 1;
                if classes > 2 {
                    break;
                }
            }
            if classes == 1 {
                if a == 1 || freq[&(a as i32)] == 1 {
                    best = n as i32;
                }
            } else if classes == 2 {
                if a > b {
                    std::mem::swap(&mut a, &mut b);
                }
                if b == a + 1 && freq[&(b as i32)] == 1 {
                    best = n as i32;
                } else if a == 1 && freq[&(a as i32)] == 1 && 1 + b * freq[&(b as i32)] as i64 == n as i64 {
                    best = n as i32;
                }
            }
        }
        best
    }
}
