impl Solution {
    pub fn stable_mountains(height: Vec<i32>, threshold: i32) -> Vec<i32> {
        // Mountain i is stable exactly when its immediate predecessor is
        // strictly taller than the threshold; one left-to-right pass emits
        // the qualifying indices in ascending order.
        let mut stable = Vec::new();
        for i in 1..height.len() {
            if height[i - 1] > threshold {
                stable.push(i as i32);
            }
        }
        stable
    }
}
