use std::collections::HashSet;

impl Solution {
    pub fn recover_order(order: Vec<i32>, friends: Vec<i32>) -> Vec<i32> {
        // The roster is capped at eight ids, so a hash set answers every
        // membership test in O(1) expected time.
        let wanted: HashSet<i32> = friends.into_iter().collect();
        // Scanning order left to right makes the kept ids emerge already in
        // finishing order -- no sorting step is needed.
        order.into_iter().filter(|racer| wanted.contains(racer)).collect()
    }
}
