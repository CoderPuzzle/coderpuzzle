class Solution {
  public:
    bool isHappy(int n) {
        // Sum of the squares of the digits, one digit per iteration.
        auto step = [](int m) {
            int total = 0;
            while (m) {
                int digit = m % 10;
                total += digit * digit;
                m /= 10;
            }
            return total;
        };
        // The digit-square map is deterministic, so iterating it must reach 1
        // (a fixed point) or cycle; insert() reporting a duplicate (false)
        // means a revisit, so it will never reach 1.
        unordered_set<int> seen;
        while (n != 1 && seen.insert(n).second) {
            n = step(n);
        }
        return n == 1;
    }
};
