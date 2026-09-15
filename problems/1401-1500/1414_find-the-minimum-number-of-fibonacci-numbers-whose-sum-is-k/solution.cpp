class Solution {
  public:
    int findMinFibonacciNumbers(int k) {
        vector<long long> fibs = {1, 1};
        while (fibs.back() + fibs[fibs.size() - 2] <= k) {
            fibs.push_back(fibs.back() + fibs[fibs.size() - 2]);
        }
        // Zeckendorf: greedily taking the largest F <= k never lands on two
        // consecutive Fibonacci numbers, so this builds the unique minimal
        // (non-consecutive) representation term by term
        int count = 0;
        long long remaining = k;
        int index = static_cast<int>(fibs.size()) - 1;
        while (remaining > 0) {
            while (fibs[index] > remaining) {
                index--;
            }
            remaining -= fibs[index];
            count++;
        }
        return count;
    }
};
