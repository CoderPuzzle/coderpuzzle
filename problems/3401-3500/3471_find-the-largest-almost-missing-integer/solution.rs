impl Solution {
    pub fn largest_integer(nums: Vec<i32>, k: i32) -> i32 {
        let (k, n) = (k as usize, nums.len());
        // One counter per possible value (0..50): how many distinct windows
        // of size k contain it.
        let mut count = [0i32; 51];
        let mut stamp = [-1i32; 51];
        for start in 0..=(n - k) {
            // Dedup inside the window with a stamp: a value repeated within
            // one window still counts once there.
            for &value in &nums[start..start + k] {
                let v = value as usize;
                if stamp[v] != start as i32 {
                    stamp[v] = start as i32;
                    count[v] += 1;
                }
            }
        }
        // Scan down from the largest possible value: first hit wins.
        for value in (0..=50i32).rev() {
            if count[value as usize] == 1 {
                return value;
            }
        }
        -1
    }
}
