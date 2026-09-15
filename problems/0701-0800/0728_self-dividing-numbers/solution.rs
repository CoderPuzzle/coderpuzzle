impl Solution {
    // Each candidate is judged on a copy: peeling digits off the tail
    // with %10 and /10 walks the decimal writing from last digit to
    // first while n itself stays intact for the divisibility test. A
    // digit of 0 rejects on sight — it divides nothing, and the
    // statement bars it anyway — and any digit leaving a remainder in
    // n % d rejects too; survivors append in scan order, which is
    // already ascending.
    pub fn self_dividing_numbers(left: i32, right: i32) -> Vec<i32> {
        let mut answer = Vec::new();
        for n in left..=right {
            let (mut m, mut ok) = (n, true);
            while m > 0 {
                let d = m % 10;
                if d == 0 || n % d != 0 {
                    ok = false;
                    break;
                }
                m /= 10;
            }
            if ok {
                answer.push(n);
            }
        }
        answer
    }
}
