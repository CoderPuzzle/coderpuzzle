use std::collections::HashMap;

impl Solution {
    pub fn find_shortest_sub_array(nums: Vec<i32>) -> i32 {
        // The degree is a maximum frequency, and a window reaches it only by
        // holding every copy of some value at that frequency: drop one copy
        // and that value falls short. One pass records each value's count,
        // first index, and last index; the answer is then the tightest
        // first-to-last span among the values whose count equals the degree.
        let mut count: HashMap<i32, i32> = HashMap::new();
        let mut first: HashMap<i32, i32> = HashMap::new();
        let mut last: HashMap<i32, i32> = HashMap::new();
        for (index, &value) in nums.iter().enumerate() {
            *count.entry(value).or_insert(0) += 1;
            first.entry(value).or_insert(index as i32);
            last.insert(value, index as i32);
        }
        let degree = count.values().copied().max().unwrap_or(0);
        let mut best = nums.len() as i32;
        for (&value, &freq) in count.iter() {
            if freq == degree {
                let span = last[&value] - first[&value] + 1;
                if span < best {
                    best = span;
                }
            }
        }
        best
    }
}
