impl Solution {
    pub fn check_if_can_break(s1: String, s2: String) -> bool {
        let mut a: Vec<u8> = s1.into_bytes();
        let mut b: Vec<u8> = s2.into_bytes();
        a.sort_unstable();
        b.sort_unstable();
        Self::dominates(&a, &b) || Self::dominates(&b, &a)
    }

    fn dominates(x: &[u8], y: &[u8]) -> bool {
        for i in 0..x.len() {
            if x[i] < y[i] {
                return false;
            }
        }
        true
    }
}
