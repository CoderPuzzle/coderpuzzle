impl Solution {
    pub fn contains_duplicate(nums: Vec<i32>) -> bool {
        // Sorting drags equal values next to each other, so a duplicate
        // anywhere in the array turns into a matching neighbouring pair.
        let mut ordered = nums;
        ordered.sort_unstable();
        for pair in ordered.windows(2) {
            // After sorting only neighbours can be equal, so one comparison
            // per gap rules out every pair that might match.
            if pair[0] == pair[1] {
                return true;
            }
        }
        // Every gap held two different values: nothing repeats.
        false
    }
}
