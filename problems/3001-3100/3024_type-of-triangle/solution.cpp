class Solution {
  public:
    string triangleType(vector<int> &nums) {
        // A triple is a triangle only when every pair of sides sums to
        // strictly more than the third side. Strictness rejects the
        // degenerate case where the two shorter sides merely equal the
        // longest one: [1, 2, 3] lies flat and gets "none", not a type.
        int a = nums[0], b = nums[1], c = nums[2];
        if (a + b <= c || a + c <= b || b + c <= a) {
            return "none";
        }
        // With validity settled, compare the lengths directly: all equal
        // is "equilateral", any single matching pair is "isosceles", and
        // all distinct is "scalene". With only three sides at most one
        // pair can match unless all three do, so this ladder is
        // exhaustive.
        if (a == b && b == c) {
            return "equilateral";
        }
        if (a == b || b == c || a == c) {
            return "isosceles";
        }
        return "scalene";
    }
};
