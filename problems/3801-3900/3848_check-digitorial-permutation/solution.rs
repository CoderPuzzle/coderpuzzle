impl Solution {
    pub fn is_digitorial_permutation(n: i32) -> bool {
        // The factorial digit sum ignores digit order, so every
        // permutation of n shares one sum s. A digitorial permutation p
        // of n must equal its own factorial digit sum, which is also s,
        // so p = s and p reuses exactly n's digits. Conversely, when s
        // uses exactly n's digits, s itself is a leading-zero-free
        // arrangement of them (s >= 1) and equals its own factorial
        // digit sum. With n <= 10^9, s <= 10 * 9! = 3,628,800, so i32
        // arithmetic never overflows.
        let fact = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880];
        let digits = n.to_string();
        let mut s: i32 = 0;
        for c in digits.bytes() {
            s += fact[(c - b'0') as usize];
        }
        let mut a: Vec<u8> = digits.bytes().collect();
        let mut b: Vec<u8> = s.to_string().bytes().collect();
        a.sort();
        b.sort();
        a == b
    }
}
