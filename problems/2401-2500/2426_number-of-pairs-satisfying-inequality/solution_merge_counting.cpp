class Solution {
  public:
    long long numberOfPairs(vector<int> &nums1, vector<int> &nums2, int diff) {
        int n = nums1.size();
        vector<long long> values(n);
        for (int i = 0; i < n; i++) {
            values[i] = (long long)nums1[i] - nums2[i];
        }
        long long count = 0;
        auto merge_sort = [&](auto &&self, int lo, int hi) {
            if (hi - lo < 2) {
                return;
            }
            int mid = (lo + hi) / 2;
            self(self, lo, mid);
            self(self, mid, hi);
            vector<long long> left(values.begin() + lo, values.begin() + mid);
            int p = 0; // left values at or below the running bound
            for (int j = mid; j < hi; j++) {
                while (p < (int)left.size() && left[p] <= values[j] + diff) {
                    p++;
                }
                count += p; // each admitted left value pairs with this right element
            }
            int i = 0, j = mid, k = lo;
            while (i < (int)left.size() && j < hi) {
                if (left[i] <= values[j]) { // equal: the left element places first
                    values[k] = left[i];
                    i++;
                } else {
                    values[k] = values[j];
                    j++;
                }
                k++;
            }
            while (i < (int)left.size()) {
                values[k] = left[i];
                i++;
                k++;
            }
        };
        merge_sort(merge_sort, 0, n);
        return count;
    }
};
