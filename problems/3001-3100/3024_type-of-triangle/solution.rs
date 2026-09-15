impl Solution {
    pub fn triangle_type(nums: Vec<i32>) -> String {
        // A triple is a triangle only when every pair of sides sums to
        // strictly more than the third side. Strictness rejects the
        // degenerate case where the two shorter sides merely equal the
        // longest one: [1, 2, 3] lies flat and gets "none", not a type.
        let (a, b, c) = (nums[0], nums[1], nums[2]);
        if a + b <= c || a + c <= b || b + c <= a {
            return "none".to_string();
        }
        // With validity settled, compare the lengths directly: all equal
        // is "equilateral", any single matching pair is "isosceles", and
        // all distinct is "scalene". With only three sides at most one
        // pair can match unless all three do, so this ladder is
        // exhaustive.
        if a == b && b == c {
            return "equilateral".to_string();
        }
        if a == b || b == c || a == c {
            return "isosceles".to_string();
        }
        "scalene".to_string()
    }
}
