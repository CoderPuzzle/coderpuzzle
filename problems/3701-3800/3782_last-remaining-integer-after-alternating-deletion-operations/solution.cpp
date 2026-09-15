class Solution {
  public:
    long long lastInteger(long long n) {
        long long start = 1, step = 1, remaining = n;
        bool fromLeft = true;
        while (remaining > 1) {
            if (!fromLeft && remaining % 2 == 0) {
                start += step;
            }
            remaining = (remaining + 1) / 2;
            step *= 2;
            fromLeft = !fromLeft;
        }
        return start;
    }
};
