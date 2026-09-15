impl Solution {
    pub fn can_measure_water(x: i32, y: i32, target: i32) -> bool {
        // Filling or emptying a jug moves the total a + b by ±x or ±y, and
        // a pour leaves it alone, so every reachable total is a multiple
        // of g = gcd(x, y) not exceeding x + y; by Bézout each of those
        // multiples is reachable. Target 0 is the start state (true even
        // for two empty jugs); the x > 0 guard keeps the modulo safe when
        // both capacities are zero.
        if target > x + y {
            return false;
        }
        if target == 0 {
            return true;
        }
        let (mut x, mut y) = (x, y);
        while y != 0 {
            let rest = x % y;
            x = y;
            y = rest;
        }
        x > 0 && target % x == 0
    }
}
