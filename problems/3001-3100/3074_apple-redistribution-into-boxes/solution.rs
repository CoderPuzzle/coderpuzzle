impl Solution {
    pub fn minimum_boxes(apple: Vec<i32>, capacity: Vec<i32>) -> i32 {
        // Packs split freely across boxes, so only the apple total
        // matters, not its division into packs. Filling the largest
        // boxes first makes each selected box cover as much of the
        // total as possible, so the prefix of the descending-sorted
        // capacities is optimal.
        let total: i32 = apple.iter().sum();
        let mut rooms = capacity;
        rooms.sort_by(|a, b| b.cmp(a));
        let mut filled = 0;
        for (count, &room) in rooms.iter().enumerate() {
            filled += room;
            if filled >= total {
                return (count + 1) as i32;
            }
        }
        // The input guarantees a full redistribution is possible.
        rooms.len() as i32
    }
}
