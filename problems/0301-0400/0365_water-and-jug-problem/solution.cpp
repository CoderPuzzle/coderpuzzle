class Solution {
  public:
    bool canMeasureWater(int x, int y, int target) {
        // Filling or emptying a jug moves the total a + b by ±x or ±y, and
        // a pour leaves it alone, so every reachable total is a multiple
        // of g = gcd(x, y) not exceeding x + y; by Bézout each of those
        // multiples is reachable. Target 0 is the start state (true even
        // for two empty jugs); the x > 0 guard keeps the modulo safe when
        // both capacities are zero.
        if (target > x + y) {
            return false;
        }
        if (target == 0) {
            return true;
        }
        while (y != 0) {
            int rest = x % y;
            x = y;
            y = rest;
        }
        return x > 0 && target % x == 0;
    }
};
