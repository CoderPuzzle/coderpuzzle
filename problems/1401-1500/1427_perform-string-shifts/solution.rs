impl Solution {
    pub fn string_shift(s: String, shift: Vec<Vec<i32>>) -> String {
        let mut net: i32 = 0;
        for operation in &shift {
            if operation[0] == 0 {
                net += operation[1];
            } else {
                net -= operation[1];
            }
        }
        let n = s.len() as i32;
        let k = ((net % n) + n) % n;
        let k = k as usize;
        format!("{}{}", &s[k..], &s[..k])
    }
}
