impl Solution {
    pub fn max_area(height: Vec<i32>) -> i64 {
        // Start with the widest possible container, one pointer at each end.
        let mut left = 0usize;
        let mut right = height.len() - 1;
        let mut best = 0i64;
        while left < right {
            // Area = width x the shorter wall: water above it would spill.
            let h = height[left].min(height[right]);
            let area = (right - left) as i64 * h as i64;
            if area > best {
                best = area;
            }
            // Moving the taller wall inward can never help -- the area stays
            // capped by the shorter wall while the width falls -- so the
            // shorter wall's current pair is the best it can ever be part of
            // and it is safe to discard. Ties move right, equally correct.
            if height[left] < height[right] {
                left += 1;
            } else {
                right -= 1;
            }
        }
        best
    }
}
