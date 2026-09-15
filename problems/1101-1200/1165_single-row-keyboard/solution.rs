impl Solution {
    pub fn calculate_time(keyboard: String, word: String) -> i32 {
        let mut index = [0i32; 26];
        for (i, b) in keyboard.bytes().enumerate() {
            index[(b - b'a') as usize] = i as i32;
        }
        let mut total = 0i32;
        let mut position = 0i32;
        for b in word.bytes() {
            let target = index[(b - b'a') as usize];
            total += (target - position).abs();
            position = target;
        }
        total
    }
}
