impl Solution {
    pub fn count_asterisks(s: String) -> i32 {
        let mut count = 0;
        let mut inside = false;
        for ch in s.chars() {
            match ch {
                '|' => inside = !inside,
                '*' if !inside => count += 1,
                _ => {}
            }
        }
        count
    }
}
