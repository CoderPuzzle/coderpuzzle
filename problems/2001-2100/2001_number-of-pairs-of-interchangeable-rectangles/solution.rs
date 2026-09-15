use std::collections::HashMap;

impl Solution {
    pub fn interchangeable_rectangles(rectangles: Vec<Vec<i32>>) -> i64 {
        let mut total = 0_i64;
        let mut counts: HashMap<(i32, i32), i64> = HashMap::new();
        for rectangle in rectangles {
            let divisor = Self::gcd(rectangle[0], rectangle[1]);
            let ratio = (rectangle[0] / divisor, rectangle[1] / divisor);
            let previous = counts.entry(ratio).or_insert(0);
            total += *previous;
            *previous += 1;
        }
        total
    }

    fn gcd(mut a: i32, mut b: i32) -> i32 {
        while b != 0 {
            let remainder = a % b;
            a = b;
            b = remainder;
        }
        a
    }
}
