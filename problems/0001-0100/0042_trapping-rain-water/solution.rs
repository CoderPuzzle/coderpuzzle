impl Solution {
    pub fn trap(height: Vec<i32>) -> i32 {
        // Water above bar i is min(tallest to its left, tallest to its right)
        // minus height[i]; two converging pointers derive both maxima on the
        // fly instead of precomputing two running-max arrays.
        let mut left: isize = 0;
        let mut right: isize = height.len() as isize - 1;
        let mut left_max = 0i32;
        let mut right_max = 0i32;
        let mut water = 0i32;
        // left < right retires one index per step and never processes the
        // meeting index twice (the global maximum traps nothing anyway).
        while left < right {
            // Process the smaller side: the right side holds a bar at least
            // height[right] tall, hence taller than height[left], so the water
            // at left is decided entirely by left_max.
            if height[left as usize] < height[right as usize] {
                // A bar that sets a new left_max traps nothing; below it, the
                // trapped depth is exactly left_max - height[left].
                if height[left as usize] >= left_max {
                    left_max = height[left as usize];
                } else {
                    water += left_max - height[left as usize];
                }
                left += 1;
            } else {
                // Symmetric argument on the right side.
                if height[right as usize] >= right_max {
                    right_max = height[right as usize];
                } else {
                    water += right_max - height[right as usize];
                }
                right -= 1;
            }
        }
        water
    }
}
