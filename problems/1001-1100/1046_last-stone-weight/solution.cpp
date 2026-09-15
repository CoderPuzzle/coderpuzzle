class Solution {
  public:
    int lastStoneWeight(vector<int> &stones) {
        // The game is deterministic: only fast access to the current maximum
        // is needed, which a max-heap provides.
        priority_queue<int> heap(stones.begin(), stones.end());
        while (heap.size() > 1) {
            // The two heaviest stones; equal ones annihilate (nothing pushed).
            int y = heap.top();
            heap.pop();
            int x = heap.top();
            heap.pop();
            if (x != y) {
                heap.push(y - x);
            }
        }
        // Empty heap means every stone paired off into equal smashings.
        return heap.empty() ? 0 : heap.top();
    }
};
