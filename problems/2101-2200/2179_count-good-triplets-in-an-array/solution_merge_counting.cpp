class Solution {
  public:
    long long goodTriplets(vector<int> &nums1, vector<int> &nums2) {
        int n = nums1.size();
        vector<int> pos2(n);
        for (int i = 0; i < n; i++) {
            pos2[nums2[i]] = i;
        }
        vector<int> a(n); // a[i] = position of nums1[i] in nums2
        for (int i = 0; i < n; i++) {
            a[i] = pos2[nums1[i]];
        }

        vector<int> smaller_after(n, 0); // per index: later nums1 values that precede it in nums2
        vector<int> order(n);            // merge-sort workspace of indexes, ordered by nums2 position
        iota(order.begin(), order.end(), 0);
        auto merge_sort = [&](auto &&self, int lo, int hi) {
            if (hi - lo < 2) {
                return;
            }
            int mid = (lo + hi) / 2;
            self(self, lo, mid);
            self(self, mid, hi);
            vector<int> left(order.begin() + lo, order.begin() + mid);
            int i = 0, j = mid, k = lo;
            while (i < (int)left.size() && j < hi) {
                if (a[left[i]] < a[order[j]]) {
                    smaller_after[left[i]] += j - mid; // right-half values already placed below it
                    order[k] = left[i];
                    i++;
                } else {
                    order[k] = order[j];
                    j++;
                }
                k++;
            }
            while (i < (int)left.size()) {
                smaller_after[left[i]] += j - mid; // the whole right half sits below it
                order[k] = left[i];
                i++;
                k++;
            }
        };
        merge_sort(merge_sort, 0, n);

        long long answer = 0;
        for (int i = 0; i < n; i++) {
            long long left = a[i] - smaller_after[i]; // values before value in nums1 and in nums2
            // values after value in both arrays
            long long right = (long long)(n - 1 - i) - smaller_after[i];
            answer += left * right;
        }
        return answer;
    }
};
