class Solution {
  public:
    int brokenCalc(int startValue, int target) {
        // Work backwards from target: reverse double is halve (only legal
        // on an even number) and reverse subtract-1 is add-1. While target
        // sits above startValue, an odd target must add 1 before it can
        // halve, and an even target halves at once — two adds pushed before
        // a halve equal one add after it, so deferring every add is optimal.
        // Below startValue only plain subtractions remain.
        long long start = startValue;
        long long value = target;
        long long ops = 0;
        while (value > start) {
            if (value % 2 == 1) {
                value += 1;
            } else {
                value /= 2;
            }
            ops += 1;
        }
        long long total = ops + start - value;
        return (int)total;
    }
};
