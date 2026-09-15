class Solution {
  public:
    vector<int> findMaxSum(vector<int> &nums1, vector<int> &nums2, int k) {
        int n = (int)nums1.size();
        vector<int> indices(n);
        for (int i = 0; i < n; i++)
            indices[i] = i;
        // sweep indices by increasing nums1: each query pools the strictly smaller values
        stable_sort(indices.begin(), indices.end(), [&](int a, int b) { return nums1[a] < nums1[b]; });
        priority_queue<int, vector<int>, greater<int>> heap; // min-heap of top-k nums2 values
        long long total = 0;
        vector<int> result(n, 0);
        int i = 0;
        while (i < n) {
            int j = i;
            while (j < n && nums1[indices[j]] == nums1[indices[i]])
                j++;
            // strict <: the equal-value block is answered before its own values join
            for (int t = i; t < j; t++)
                result[indices[t]] = (int)total;
            // pool invariant: the heap holds the top-k nums2 so far, total their sum
            for (int t = i; t < j; t++) {
                // evict the current minimum only when the newcomer beats it
                int val = nums2[indices[t]];
                if ((int)heap.size() < k) {
                    heap.push(val);
                    total += val;
                } else if (val > heap.top()) {
                    total += val - heap.top();
                    heap.pop();
                    heap.push(val);
                }
            }
            i = j;
        }
        return result;
    }
};
