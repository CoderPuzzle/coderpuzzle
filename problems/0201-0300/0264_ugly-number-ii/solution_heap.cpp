class Solution {
  public:
    int nthUglyNumber(int n) {
        // Frontier of the generation process: a min-heap seeded with 1, so
        // the smallest not-yet-emitted ugly number is always at its top.
        // 64-bit elements: pushed multiples can overshoot the 32-bit answer.
        priority_queue<long long, vector<long long>, greater<long long>> heap;
        heap.push(1);
        // The heap is a frontier, not a set: pushing every successor would
        // enqueue duplicates (6 = 2·3 = 3·2), so seen gates each push.
        unordered_set<long long> seen;
        seen.insert(1);
        for (int i = 1; i < n; ++i) {
            long long value = heap.top();
            heap.pop();
            for (long long factor : {2LL, 3LL, 5LL}) {
                long long multiple = value * factor;
                if (seen.insert(multiple).second) {
                    heap.push(multiple);
                }
            }
        }
        // After n-1 pops the heap top is the n-th ugly number in order.
        return (int)heap.top();
    }
};
