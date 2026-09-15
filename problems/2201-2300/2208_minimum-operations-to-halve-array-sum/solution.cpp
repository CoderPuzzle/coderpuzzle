class Solution {
  public:
    int halveArray(vector<int> &nums) {
        // max-heap of doubles; halving only decrements a binary float's exponent,
        // so the repeated /2 arithmetic stays exact
        priority_queue<double> pq;
        double total = 0;
        for (int x : nums) {
            pq.push((double)x);
            total += x;
        }
        // track the remaining reduction needed instead of re-summing each step
        double target = total / 2.0;
        int ops = 0;
        while (target > 0) {
            // greedy: halving the current maximum removes the most sum per op
            double largest = pq.top();
            pq.pop();
            double half = largest / 2.0;
            target -= half;
            // the half may still be the max and get halved again
            pq.push(half);
            ops++;
        }
        return ops;
    }
};
