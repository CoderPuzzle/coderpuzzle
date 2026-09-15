impl Solution {
    pub fn common_factors(a: i32, b: i32) -> i32 {
        // A common factor divides both numbers, hence their gcd; every
        // divisor of the gcd divides both. So the answer is the divisor
        // count of g = gcd(a, b): pair each d <= sqrt(g) dividing g with
        // its cofactor g / d (a perfect square pairs only once).
        let (mut a, mut b) = (a, b);
        while b != 0 {
            let t = a % b;
            a = b;
            b = t;
        }
        let g = a;
        let mut count = 0;
        let mut d = 1;
        while d * d <= g {
            if g % d == 0 {
                count += if d * d == g { 1 } else { 2 };
            }
            d += 1;
        }
        count
    }
}
