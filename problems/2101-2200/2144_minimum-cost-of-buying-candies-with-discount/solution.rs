impl Solution {
    pub fn minimum_cost(cost: Vec<i32>) -> i32 {
        let mut values = cost;
        values.sort_unstable_by(|left, right| right.cmp(left));
        values
            .into_iter()
            .enumerate()
            .filter(|(index, _)| index % 3 != 2)
            .map(|(_, value)| value)
            .sum()
    }
}
