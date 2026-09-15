class Solution {
  public:
    long long maxScore(vector<int> &nums1, vector<int> &nums2, int k) {
        int n = nums1.size();
        vector<int> idx(n);
        for (int i = 0; i < n; i++)
            idx[i] = i;
        // Enumerate which element provides the min(nums2): sweeping indices
        // in descending nums2 order means everything already seen has
        // nums2 >= b, so b is the minimum of any set drawn from seen pairs.
        stable_sort(idx.begin(), idx.end(), [&](int a, int b) { return nums2[a] > nums2[b]; });
        priority_queue<int, vector<int>, greater<int>> heap;
        long long total = 0;
        long long best = 0;
        for (int i = 0; i < n; i++) {
            int j = idx[i];
            heap.push(nums1[j]);
            total += nums1[j];
            // Min-heap of size k with a running sum holds the k largest nums1
            // seen so far; ejecting the smallest keeps the top-k sum correct.
            if ((int)heap.size() > k) {
                total -= heap.top();
                heap.pop();
            }
            // With k companions available, total * nums2[j] is the best score
            // under the assumption that nums2[j] is the minimum; take the max
            // over the sweep. Ties in nums2 are safe: the last of them still
            // sees all the others in the heap.
            if ((int)heap.size() == k) {
                best = max(best, total * (long long)nums2[j]);
            }
        }
        return best;
    }
};
