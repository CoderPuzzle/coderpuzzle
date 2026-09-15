impl Solution {
    pub fn asteroid_collision(asteroids: Vec<i32>) -> Vec<i32> {
        // The stack holds survivors — internally stable, all collisions resolved.
        let mut stack: Vec<i32> = Vec::with_capacity(asteroids.len());
        for &asteroid in &asteroids {
            let mut alive = true;
            // A newcomer can only fight the top, and only when it moves left
            // against a right-moving survivor; other pairs never meet.
            while alive && !stack.is_empty() && asteroid < 0 && *stack.last().unwrap() > 0 {
                let top = *stack.last().unwrap();
                if top < -asteroid {
                    // Top explodes; the newcomer continues against the new top.
                    stack.pop();
                } else if top == -asteroid {
                    // Equal sizes: both explode.
                    stack.pop();
                    alive = false;
                } else {
                    // Top is larger: the newcomer explodes.
                    alive = false;
                }
            }
            if alive {
                stack.push(asteroid);
            }
        }
        stack
    }
}
