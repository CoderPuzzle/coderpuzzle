impl Solution {
    pub fn find_closest(x: i32, y: i32, z: i32) -> i32 {
        // Same speed means arrival order is just distance order, so compare
        // the two absolute distances to the stationary Person 3.
        let dx = (x - z).abs();
        let dy = (y - z).abs();
        if dx < dy {
            1
        } else if dy < dx {
            2
        } else {
            0
        }
    }
}
