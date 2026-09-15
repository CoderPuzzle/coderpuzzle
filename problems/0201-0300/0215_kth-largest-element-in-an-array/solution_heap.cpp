class Solution {
  public:
    int findKthLargest(vector<int> &nums, int k) {
        // A min-heap of size k holds the k largest values seen so far;
        // its root is the smallest of them — the current kth largest.
        priority_queue<int, vector<int>, greater<int>> heap(nums.begin(), nums.begin() + k);
        for (int i = k; i < (int)nums.size(); i++) {
            // Peek first: only values strictly greater than the root
            // earn a pop-and-push, keeping the pass O(n log k).
            if (nums[i] > heap.top()) {
                heap.pop();
                heap.push(nums[i]);
            }
        }
        // When the scan ends the root is the smallest of the top k —
        // the kth largest by rank, duplicates counted.
        return heap.top();
    }
};
