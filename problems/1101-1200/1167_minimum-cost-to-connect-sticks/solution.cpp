class Solution {
  public:
    int connectSticks(vector<int> &sticks) {
        if (sticks.size() <= 1) {
            // a single stick needs no merge
            return 0;
        }
        priority_queue<long long, vector<long long>, greater<long long>> heap(sticks.begin(), sticks.end());
        long long total = 0;
        // Huffman-style exchange argument: a length is paid once per merge
        // above it, so always merging the two shortest is optimal
        while (heap.size() > 1) {
            long long combined = heap.top();
            heap.pop();
            combined += heap.top();
            heap.pop();
            total += combined;
            // the combined stick re-enters the pool for later merges
            heap.push(combined);
        }
        return (int)total;
    }
};
