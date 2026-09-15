class Solution {
  public:
    int minStoneSum(vector<int> &piles, int k) {
        // Max-heap. The removal floor(p/2) is non-decreasing in p, so always
        // halving the current max is optimal: any operation on a smaller
        // pile could be swapped to the larger one without worsening the total.
        priority_queue<int> heap(piles.begin(), piles.end());
        for (int i = 0; i < k; i++) {
            int top = heap.top();
            if (top == 1)
                break; // floor(1/2) removes nothing: remaining ops are no-ops
            heap.pop();
            heap.push(top - top / 2); // push the half that remains
        }
        long long total = 0;
        while (!heap.empty()) {
            total += heap.top();
            heap.pop();
        }
        return (int)total;
    }
};
