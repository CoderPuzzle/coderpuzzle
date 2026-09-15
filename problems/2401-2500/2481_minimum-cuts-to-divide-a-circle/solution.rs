impl Solution {
    // A diameter cut produces two opposite boundary rays, which can only
    // sit inside an equally spaced ray set when n is even; odd n forces
    // every cut to be a radius, one per slice. A single slice needs none.
    pub fn number_of_cuts(n: i32) -> i32 {
        if n == 1 {
            return 0;
        }
        if n % 2 == 0 {
            n / 2
        } else {
            n
        }
    }
}
