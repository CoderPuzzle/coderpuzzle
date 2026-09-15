// Fill from the end. At a position with i open slots before it, reserve
// one unit per open slot and spend everything else here, capped at z. The
// first time the cap stops binding, the reserve drops to exactly the open
// count and every earlier slot is 'a'.
impl Solution {
    pub fn get_smallest_string(n: i32, k: i32) -> String {
        let n = n as usize;
        let mut remaining = k as i64;
        let mut chars = vec![b'a'; n];
        for i in (0..n).rev() {
            let value = (remaining - i as i64).min(26);
            chars[i] = b'a' + (value - 1) as u8;
            remaining -= value;
        }
        chars.into_iter().map(|b| b as char).collect()
    }
}
