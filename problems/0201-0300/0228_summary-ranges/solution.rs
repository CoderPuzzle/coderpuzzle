impl Solution {
    pub fn summary_ranges(nums: Vec<i32>) -> Vec<String> {
        let mut ranges: Vec<String> = Vec::new();
        let mut i = 0;
        while i < nums.len() {
            let start = i;
            // The run extends while the next value is exactly one past the
            // current one. The guard short-circuits, so the +1 is only
            // evaluated when a successor exists — and that successor is
            // strictly larger, capping nums[i] below i32::MAX, so the add
            // cannot overflow even in a debug build.
            while i + 1 < nums.len() && nums[i + 1] == nums[i] + 1 {
                i += 1;
            }
            // The run [nums[start], nums[i]] is maximal once the extension
            // stops; equal endpoints collapse to the bare "a" form.
            if nums[start] == nums[i] {
                ranges.push(nums[start].to_string());
            } else {
                ranges.push(format!("{}->{}", nums[start], nums[i]));
            }
            i += 1;
        }
        ranges
    }
}
