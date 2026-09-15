use std::collections::HashMap;

impl Solution {
    pub fn minimum_distance(nums: Vec<i32>) -> i32 {
        // Sorted as a < b < c, a good tuple's distance collapses to
        // (b - a) + (c - b) + (c - a) = 2 * (c - a): only the outermost
        // indices matter, so the tightest triple of a value spans three
        // consecutive occurrences of it.
        let mut best = -1;
        // Last two indices seen for each value; any older occurrence can
        // only widen the span, so it never matters again.
        let mut recent: HashMap<i32, Vec<usize>> = HashMap::new();
        for i in 0..nums.len() {
            let last = recent.entry(nums[i]).or_default();
            if last.len() == 2 {
                let distance = (2 * (i - last[0])) as i32;
                if best == -1 || distance < best {
                    best = distance;
                }
                last[0] = last[1];
                last[1] = i;
            } else {
                last.push(i);
            }
        }
        best
    }
}
