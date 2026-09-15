impl Solution {
    pub fn max_number_of_apples(mut weight: Vec<i32>) -> i32 {
        // Lightest apples first: any optimal packing can be assumed to
        // consist of them, so a sorted greedy prefix is exactly optimal.
        weight.sort_unstable();
        let mut total: i64 = 0;
        for (i, &w) in weight.iter().enumerate() {
            if total + w as i64 > 5000 {
                return i as i32;
            }
            total += w as i64;
        }
        weight.len() as i32
    }
}
