// score(i) = zeros in nums[:i] + ones in nums[i:]. Both addends stay as
// running counters — ones on the right is total_ones minus the ones
// already passed — so each of the n + 1 division points costs O(1). The
// sweep emits indices ascending.
impl Solution {
    pub fn max_score_indices(nums: Vec<i32>) -> Vec<i32> {
        let n = nums.len();
        let total_ones: i32 = nums.iter().sum();
        let mut ones_left = 0;
        let mut zeros_left = 0;
        let mut best = -1;
        let mut answer: Vec<i32> = Vec::new();
        for i in 0..=n {
            let score = zeros_left + total_ones - ones_left;
            if score > best {
                best = score;
                answer.clear();
                answer.push(i as i32);
            } else if score == best {
                answer.push(i as i32);
            }
            if i < n {
                if nums[i] == 1 {
                    ones_left += 1;
                } else {
                    zeros_left += 1;
                }
            }
        }
        answer
    }
}
