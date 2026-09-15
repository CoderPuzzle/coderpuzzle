class Solution {
  public:
    int makePrefSumNonNegative(vector<int> &nums) {
        priority_queue<long long, vector<long long>, greater<long long>> heap;
        long long prefix = 0;
        int ops = 0;
        for (int num : nums) {
            prefix += num;
            // Every element seen so far is a deferral candidate; a negative
            // is handled not when read but at the first prefix it poisons.
            heap.push(num);
            // Prefix dipped below zero: defer the smallest element seen so
            // far to the end. Removing the minimum raises the prefix the
            // most, so by an exchange argument this uses the fewest ops.
            while (prefix < 0) {
                prefix -= heap.top();
                heap.pop();
                ops++;
            }
        }
        return ops;
    }
};
