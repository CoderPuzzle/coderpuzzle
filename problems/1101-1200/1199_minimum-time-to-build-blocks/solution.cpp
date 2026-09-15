class Solution {
  public:
    int minBuildTime(vector<int> &blocks, int split) {
        priority_queue<int, vector<int>, greater<int>> heap(blocks.begin(), blocks.end());
        while (heap.size() > 1) {
            // Mount the two cheapest subtrees under one new split; heavier
            // work stays shallower, where the fan-out runs in parallel.
            int first = heap.top();
            heap.pop();
            int second = heap.top();
            heap.pop();
            heap.push(max(first, second) + split);
        }
        return heap.top();
    }
};
