impl Solution {
    pub fn time_required_to_buy(tickets: Vec<i32>, k: i32) -> i32 {
        let target = tickets[k as usize];
        tickets
            .into_iter()
            .enumerate()
            .map(|(index, count)| count.min(if index <= k as usize { target } else { target - 1 }))
            .sum()
    }
}
