impl Solution {
    pub fn smallest_even_multiple(n: i32) -> i32 {
        // A multiple of both 2 and n is a multiple of lcm(2, n). When n is
        // even, n already carries the factor 2 and is its own lcm; odd n
        // needs the 2 supplied, so the answer doubles it.
        if n % 2 == 0 {
            n
        } else {
            2 * n
        }
    }
}
