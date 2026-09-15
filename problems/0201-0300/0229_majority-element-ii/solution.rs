impl Solution {
    // Extended Boyer-Moore voting: two candidate slots, two counters. A match
    // raises its slot's counter, a zero counter adopts the current value, and
    // a value matching neither slot spends both counters.
    pub fn majority_element(nums: Vec<i32>) -> Vec<i32> {
        let (mut candidate1, mut count1) = (0, 0);
        let (mut candidate2, mut count2) = (0, 0);
        for &value in &nums {
            if value == candidate1 {
                count1 += 1;
            } else if value == candidate2 {
                count2 += 1;
            } else if count1 == 0 {
                candidate1 = value;
                count1 = 1;
            } else if count2 == 0 {
                candidate2 = value;
                count2 = 1;
            } else {
                count1 -= 1;
                count2 -= 1;
            }
        }
        // The vote only nominates; a verification pass counts each nominee's
        // real occurrences and keeps only those above the floor(n/3) bar.
        let threshold = nums.len() / 3;
        let mut total1 = 0;
        let mut total2 = 0;
        for &value in &nums {
            if value == candidate1 {
                total1 += 1;
            } else if value == candidate2 {
                total2 += 1;
            }
        }
        let mut result = Vec::new();
        if total1 > threshold {
            result.push(candidate1);
        }
        if candidate2 != candidate1 && total2 > threshold {
            result.push(candidate2);
        }
        // At most two answers survive; sorting pins the ascending order the
        // examples show.
        result.sort();
        result
    }
}
