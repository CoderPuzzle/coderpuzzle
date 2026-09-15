class Solution {
  public:
    int sumSubarrayMins(vector<int> &arr) {
        const long long MOD = 1000000007LL;
        int n = arr.size();
        vector<int> left(n), right(n);
        vector<int> stack;
        // left[i]: index of the previous strictly smaller element (pops >=),
        // with -1 letting the dominance span reach the left border.
        for (int i = 0; i < n; i++) {
            while (!stack.empty() && arr[stack.back()] >= arr[i]) {
                stack.pop_back();
            }
            left[i] = stack.empty() ? -1 : stack.back();
            stack.push_back(i);
        }
        stack.clear();
        // right[i]: next smaller-or-equal element (pops only >). The
        // asymmetry attributes tied minima to the leftmost position, so
        // no subarray is counted twice; n spans to the right border.
        for (int i = n - 1; i >= 0; i--) {
            while (!stack.empty() && arr[stack.back()] > arr[i]) {
                stack.pop_back();
            }
            right[i] = stack.empty() ? n : stack.back();
            stack.push_back(i);
        }
        // arr[i] is the minimum exactly when the subarray's endpoints lie in
        // (left[i], i] x [i, right[i]) — that product counts them all.
        long long total = 0;
        for (int i = 0; i < n; i++) {
            total += (long long)arr[i] * (i - left[i]) * (right[i] - i);
        }
        return (int)(total % MOD);
    }
};
