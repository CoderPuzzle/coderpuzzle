impl Solution {
    pub fn generate_the_string(n: i32) -> String {
        let n = n as usize;
        let mut out = vec![b'a'; n];
        if n % 2 == 0 {
            out[n - 1] = b'b';
        }
        String::from_utf8(out).unwrap()
    }
}
