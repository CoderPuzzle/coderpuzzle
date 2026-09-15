class Solution {
  public:
    vector<int> countSmaller(vector<int> &nums) {
        int n = nums.size();
        vector<int> result(n, 0); // per index: strictly smaller values to its right
        vector<int> order(n);     // merge-sort workspace of indexes, ordered by value
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
                if (nums[left[i]] <= nums[order[j]]) { // equal: the left element places first, uncounted
                    result[left[i]] += j - mid;        // right-half values already placed below it
                    order[k] = left[i];
                    i++;
                } else {
                    order[k] = order[j];
                    j++;
                }
                k++;
            }
            while (i < (int)left.size()) {
                result[left[i]] += j - mid; // the whole right half sits below it
                order[k] = left[i];
                i++;
                k++;
            }
        };
        merge_sort(merge_sort, 0, n);
        return result;
    }
};
