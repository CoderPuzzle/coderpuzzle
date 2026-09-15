use std::collections::HashMap;

impl Solution {
    // A hash map counts every occurrence directly: one sweep tallies each
    // value into a table keyed by the value itself, and the map ends up
    // holding each distinct value's exact frequency.
    pub fn majority_element(nums: Vec<i32>) -> Vec<i32> {
        let mut counts: HashMap<i32, i32> = HashMap::new();
        for &value in &nums {
            *counts.entry(value).or_insert(0) += 1;
        }
        // At most two values can clear the n/3 bar, so one selection pass
        // over the entries finds the only two tallies that can matter: a
        // strictly greater tally takes the top slot, demoting the leader,
        // and ties keep the earlier entry — harmless, since equal tallies
        // qualify or fail together.
        let threshold = (nums.len() / 3) as i32;
        let (mut best_value, mut best_count) = (0, 0);
        let (mut second_value, mut second_count) = (0, 0);
        for (&value, &count) in &counts {
            if count > best_count {
                second_value = best_value;
                second_count = best_count;
                best_value = value;
                best_count = count;
            } else if count > second_count {
                second_value = value;
                second_count = count;
            }
        }
        // Selection only nominates; the threshold check is where an
        // exactly-n/3 value is excluded and an unfilled slot — a tally of
        // zero — fails. Map keys are distinct, so the slots cannot collide.
        let mut result = Vec::new();
        if best_count > threshold {
            result.push(best_value);
        }
        if second_count > threshold {
            result.push(second_value);
        }
        // At most two answers survive; sorting pins the ascending order the
        // examples show.
        result.sort();
        result
    }
}
