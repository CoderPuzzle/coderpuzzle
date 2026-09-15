impl Solution {
    pub fn tribonacci(n: i32) -> i32 {
        if n == 0 {
            return 0;
        }
        // Window of (T0, T1, T2); each step advances it by one term.
        let (mut a, mut b, mut c) = (0i32, 1i32, 1i32);
        for _ in 0..(n - 2).max(0) {
            let next = a + b + c;
            a = b;
            b = c;
            c = next;
        }
        c
    }
}
