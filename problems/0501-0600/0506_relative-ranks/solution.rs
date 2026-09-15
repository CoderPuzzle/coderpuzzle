impl Solution {
    // Sorting the athletes, not the array: an index vector ordered by
    // descending score carries each athlete's placement back to its original
    // slot, so the answer keeps the input's order.
    pub fn find_relative_ranks(score: Vec<i32>) -> Vec<String> {
        let mut order: Vec<usize> = (0..score.len()).collect();
        order.sort_by(|&a, &b| score[b].cmp(&score[a]));
        let medals = ["Gold Medal", "Silver Medal", "Bronze Medal"];
        let mut answer = vec![String::new(); score.len()];
        for (place, &i) in order.iter().enumerate() {
            answer[i] = if place < 3 {
                medals[place].to_string()
            } else {
                (place + 1).to_string()
            };
        }
        answer
    }
}
