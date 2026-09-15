class Solution {
  public:
    int minimumBoxes(int n) {
        // Densest packing lives in a corner. A complete k-step staircase
        // floor of T(k) = k(k+1)/2 cells carries the pyramid of
        // S(k) = k(k+1)(k+2)/6 boxes, and j extra cells laid along the
        // next diagonal add T(j) = j(j+1)/2 more. Binary-search the
        // largest pyramid strictly below n, then the fewest runoff cells
        // covering the rest; the answer is T(k) + j.
        long long target = n;
        long long lo = 0, hi = 2500; // S(2500) > 2^31 - 1, so hi stands above every n
        while (hi - lo > 1) {
            long long mid = (lo + hi) / 2;
            if (mid * (mid + 1) * (mid + 2) / 6 < target) {
                lo = mid;
            } else {
                hi = mid;
            }
        }
        long long k = lo; // largest k with S(k) < n
        long long rest = target - k * (k + 1) * (k + 2) / 6;
        long long jlo = 1, jhi = k + 1; // T(k+1) >= rest always holds
        while (jlo < jhi) {
            long long mid = (jlo + jhi) / 2;
            if (mid * (mid + 1) / 2 >= rest) {
                jhi = mid;
            } else {
                jlo = mid + 1;
            }
        }
        long long total = k * (k + 1) / 2 + jlo;
        return (int)total;
    }
};
