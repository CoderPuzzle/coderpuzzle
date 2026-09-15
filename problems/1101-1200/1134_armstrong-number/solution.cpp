class Solution {
  public:
    bool isArmstrong(int n) {
        int k = 0;
        for (int m = n; m > 0; m /= 10)
            ++k;
        long long total = 0;
        int remaining = n;
        while (remaining > 0) {
            long long digit = remaining % 10;
            long long power = 1;
            for (int i = 0; i < k; ++i)
                power *= digit;
            total += power;
            remaining /= 10;
        }
        return total == n;
    }
};
