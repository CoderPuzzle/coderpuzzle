impl Solution {
    // One sweep records every index where x occurs, in order. Query k
    // then reads straight off that list: the k-th occurrence exists
    // exactly when k does not overrun it. Indices are 1-based ranks
    // into a 0-based list, hence the k - 1.
    pub fn occurrences_of_element(nums: Vec<i32>, queries: Vec<i32>, x: i32) -> Vec<i32> {
        let positions: Vec<i32> = nums
            .iter()
            .enumerate()
            .filter(|(_, value)| **value == x)
            .map(|(index, _)| index as i32)
            .collect();
        let total = positions.len() as i32;
        queries
            .iter()
            .map(|k| if *k <= total { positions[(k - 1) as usize] } else { -1 })
            .collect()
    }
}
