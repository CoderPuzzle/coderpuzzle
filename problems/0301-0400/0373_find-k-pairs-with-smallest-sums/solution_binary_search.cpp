class Solution {
  public:
    vector<vector<int>> kSmallestPairs(vector<int> &nums1, vector<int> &nums2, int k) {
        long long m = (long long)nums1.size();
        long long n = (long long)nums2.size();
        // How many pairs sum to at most s? Both arrays are sorted, so a
        // descending pointer into nums2 serves every nums1[i]: the bound
        // s - nums1[i] only falls as i rises, so the pointer never turns
        // back.
        auto countAtMost = [&](long long s) {
            long long total = 0;
            long long j = n - 1;
            for (long long i = 0; i < m; i++) {
                long long bound = s - nums1[i];
                while (j >= 0 && nums2[j] > bound) {
                    j--;
                }
                total += j + 1;
            }
            return total;
        };
        // The k-th smallest sum is the least s with countAtMost(s) >= k.
        long long lo = (long long)nums1[0] + nums2[0];
        long long hi = (long long)nums1[m - 1] + nums2[n - 1];
        while (lo < hi) {
            long long mid = lo + (hi - lo) / 2;
            if (countAtMost(mid) >= k) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        long long threshold = lo;
        // Every pair strictly below the threshold makes the cut — there are
        // fewer than k of them by the minimality of the threshold.
        vector<array<long long, 3>> below;
        long long j = n - 1;
        for (long long i = 0; i < m; i++) {
            while (j >= 0 && (long long)nums1[i] + nums2[j] >= threshold) {
                j--;
            }
            for (long long jj = 0; jj <= j; jj++) {
                below.push_back({(long long)nums1[i] + nums2[jj], i, jj});
            }
        }
        sort(below.begin(), below.end());
        vector<vector<int>> result;
        result.reserve(k);
        for (auto &entry : below) {
            result.push_back({nums1[entry[1]], nums2[entry[2]]});
        }
        // Top up with pairs exactly at the threshold, in (i, j) order —
        // the required tie-break among equal sums.
        long long needed = k - (long long)result.size();
        for (long long i = 0; i < m && needed > 0; i++) {
            long long target = threshold - nums1[i];
            // nums2 is sorted: the entries equal to target form one run.
            long long loJ = lower_bound(nums2.begin(), nums2.end(), target) - nums2.begin();
            long long hiJ = upper_bound(nums2.begin(), nums2.end(), target) - nums2.begin();
            for (long long jj = loJ; jj < hiJ && needed > 0; jj++) {
                result.push_back({nums1[i], nums2[jj]});
                needed--;
            }
        }
        return result;
    }
};
