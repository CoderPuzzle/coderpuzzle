impl Solution {
    pub fn sum_of_the_digits_of_harshad_number(x: i32) -> i32 {
        // Extract digits by repeated division (hint 1), then the definition
        // itself finishes the job: x is a Harshad number exactly when its
        // digit sum divides it. With x <= 100 there are at most three digits
        // and every intermediate fits an i32 comfortably.
        let mut total = 0;
        let mut remaining = x;
        while remaining > 0 {
            total += remaining % 10;
            remaining /= 10;
        }
        if x % total == 0 {
            total
        } else {
            -1
        }
    }
}
