impl Solution {
    pub fn digit_sum(s: String, k: i32) -> String {
        let k = k as usize;
        let mut current = s;
        while current.len() > k {
            let mut next = String::new();
            for chunk in current.as_bytes().chunks(k) {
                let sum: u32 = chunk.iter().map(|&b| (b - b'0') as u32).sum();
                next.push_str(&sum.to_string());
            }
            current = next;
        }
        current
    }
}
