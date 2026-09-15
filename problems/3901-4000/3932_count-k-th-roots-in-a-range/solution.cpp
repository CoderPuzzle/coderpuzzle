class Solution {
  public:
    int countKthRoots(int l, int r, int k) {
        if (k == 1)
            return r - l + 1;
        return count(r, k) - count(static_cast<long long>(l) - 1, k);
    }

  private:
    int count(long long bound, int k) {
        if (bound < 0)
            return 0;
        long long low = 0, high = bound;
        while (low < high) {
            long long middle = low + (high - low + 1) / 2;
            if (fits(middle, k, bound))
                low = middle;
            else
                high = middle - 1;
        }
        return static_cast<int>(low) + 1;
    }

    bool fits(long long base, int k, long long bound) {
        long long value = 1;
        for (int i = 0; i < k; ++i) {
            if (base != 0 && value > bound / base)
                return false;
            value *= base;
        }
        return value <= bound;
    }
};
