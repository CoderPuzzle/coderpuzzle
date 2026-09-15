impl Solution {
    pub fn limit_occurrences(nums: Vec<i32>, k: i32) -> Vec<i32> {
        let mut answer = Vec::new();
        let mut seen = 0;
        let mut previous: Option<i32> = None;
        for value in nums {
            if Some(value) != previous {
                previous = Some(value);
                seen = 0;
            }
            if seen < k {
                answer.push(value);
                seen += 1;
            }
        }
        answer
    }
}
