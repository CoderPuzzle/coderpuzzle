class Solution {
  public:
    long long kthSmallestProduct(vector<int> &nums1, vector<int> &nums2, long long k) {
        long long lo = -10000000000LL - 1, hi = 10000000000LL + 1;
        while (lo < hi) {
            long long mid = lo + (hi - lo) / 2;
            if (countLe(mid, nums1, nums2) >= k) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

  private:
    static long long floorDiv(long long a, long long b) {
        long long q = a / b;
        long long r = a % b;
        if (r != 0 && ((r < 0) != (b < 0))) {
            --q;
        }
        return q;
    }

    static long long countLe(long long v, const vector<int> &nums1, const vector<int> &nums2) {
        long long cnt = 0;
        long long n2 = (long long)nums2.size();
        for (int x : nums1) {
            if (x > 0) {
                // x * y <= v  ->  y <= floor(v / x)
                cnt += upperBound(nums2, floorDiv(v, x));
            } else if (x < 0) {
                // x * y <= v, x < 0  ->  y >= ceil(v / x)
                cnt += n2 - lowerBound(nums2, -floorDiv(-v, x));
            } else {
                // x == 0: product is 0
                if (v >= 0) {
                    cnt += n2;
                }
            }
        }
        return cnt;
    }

    // number of elements <= t
    static int upperBound(const vector<int> &a, long long t) {
        int lo = 0, hi = (int)a.size();
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if ((long long)a[mid] <= t) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }

    // number of elements < t
    static int lowerBound(const vector<int> &a, long long t) {
        int lo = 0, hi = (int)a.size();
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if ((long long)a[mid] < t) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
};
