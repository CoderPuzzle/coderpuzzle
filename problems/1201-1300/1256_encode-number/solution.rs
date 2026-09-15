impl Solution {
    pub fn encode(num: i32) -> String {
        // num + 1 in binary, minus its leading 1.
        let v = (num as u32) + 1;
        let high = 31 - v.leading_zeros();
        ((0..high).rev())
            .map(|i| if v >> i & 1 == 1 { '1' } else { '0' })
            .collect()
    }
}
