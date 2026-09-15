class Solution {
  public:
    int kthFactor(int n, int k) {
        int lo = 1, hi = n;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (countAtMost(n, mid) >= k) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return countAtMost(n, lo) >= k ? lo : -1;
    }

  private:
    // Count divisors of n up to m by pairing d with n / d.
    int countAtMost(int n, int m) {
        int count = 0;
        int d = 1;
        while ((long long)d * d <= n) {
            if (n % d == 0) {
                if (d <= m) {
                    ++count;
                }
                int complement = n / d;
                if (complement != d && complement <= m) {
                    ++count;
                }
            }
            ++d;
        }
        return count;
    }
};
