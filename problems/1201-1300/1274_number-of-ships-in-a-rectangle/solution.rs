impl Solution {
    pub fn countShips(ocean: &mut Sea, top_right: Vec<i32>, bottom_left: Vec<i32>) -> i32 {
        Self::count_in(ocean, top_right[0], top_right[1], bottom_left[0], bottom_left[1])
    }

    fn count_in(ocean: &mut Sea, right: i32, top: i32, left: i32, bottom: i32) -> i32 {
        // A split can hand a child an empty rectangle; reject it without
        // spending a query.
        if left > right || bottom > top {
            return 0;
        }
        // One query retires the whole subtree when the box is empty water.
        if !ocean.has_ships(&[right, top], &[left, bottom]) {
            return 0;
        }
        // A single point that answered yes holds exactly one ship.
        if left == right && bottom == top {
            return 1;
        }
        let mid_x = (right + left) / 2;
        let mid_y = (top + bottom) / 2;
        Self::count_in(ocean, mid_x, mid_y, left, bottom)
            + Self::count_in(ocean, mid_x, top, left, mid_y + 1)
            + Self::count_in(ocean, right, mid_y, mid_x + 1, bottom)
            + Self::count_in(ocean, right, top, mid_x + 1, mid_y + 1)
    }
}
