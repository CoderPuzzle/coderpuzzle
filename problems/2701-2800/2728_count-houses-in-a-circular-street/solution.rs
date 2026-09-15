impl Solution {
    pub fn house_count(street: &mut Street, k: i32) -> i32 {
        // Sweep k consecutive houses, closing each door as we pass.
        // Since n <= k, that arc covers the whole circle, so every door
        // — whatever its initial state — ends closed.
        for _ in 0..k {
            street.close_door();
            street.move_right();
        }
        // Reopen the house we stand on: it is now the street's ONLY
        // open door, a marker recognizable from anywhere on the circle.
        street.open_door();
        // Walk right until the marker is re-sighted. The houses stepped
        // over before returning to it count the circumference exactly.
        let mut count = 1;
        street.move_right();
        while !street.is_door_open() {
            count += 1;
            street.move_right();
        }
        count
    }
}
