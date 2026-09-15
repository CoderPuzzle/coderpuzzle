class Solution {
  public:
    int closestFair(int n) {
        // A fair integer needs an even digit count with half of the digits
        // odd. When the digit count is odd no fair integer exists with that
        // many digits, so the answer is the smallest fair number with one
        // more digit: a leading 1, then half zeros and half-1 ones (balanced
        // by construction and minimal).
        int digits = to_string(n).size();
        if (digits % 2 == 1) {
            int half = (digits + 1) / 2;
            return stoi("1" + string(half, '0') + string(half - 1, '1'));
        }
        // Even digit count: the next fair integer is close, so scan upward.
        long long limit = 1;
        for (int i = 0; i < digits; ++i) {
            limit *= 10;
        }
        for (long long k = n; k < limit; ++k) {
            if (isFair(k)) {
                return (int)k;
            }
        }
        int half = (digits + 2) / 2;
        return stoi("1" + string(half, '0') + string(half - 1, '1'));
    }

  private:
    static bool isFair(long long x) {
        int odd = 0;
        int length = 0;
        while (x > 0) {
            if (x % 10 % 2 == 1) {
                odd++;
            }
            length++;
            x /= 10;
        }
        return length % 2 == 0 && odd * 2 == length;
    }
};
