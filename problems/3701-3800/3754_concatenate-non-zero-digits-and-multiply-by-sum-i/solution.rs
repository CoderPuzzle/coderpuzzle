impl Solution {
    pub fn sum_and_multiply(n: i32) -> i64 {
        // One pass peels n's digits least-significant first: each nonzero
        // digit joins the packed value x at the place slot it earns and
        // joins the digit sum; zeros fall through untouched, so x ends up
        // holding the surviving digits in their original order. The i64
        // return carries products up to 999999999 * 81, past i32 range.
        let mut m = n;
        let mut x: i64 = 0;
        let mut place: i64 = 1;
        let mut total: i64 = 0;
        while m > 0 {
            let digit = (m % 10) as i64;
            if digit != 0 {
                x += digit * place;
                place *= 10;
                total += digit;
            }
            m /= 10;
        }
        x * total
    }
}
