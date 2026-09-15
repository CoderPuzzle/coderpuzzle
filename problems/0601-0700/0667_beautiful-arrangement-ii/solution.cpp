class Solution {
  public:
    vector<int> constructArray(int n, int k) {
        // The first k+1 slots alternate between the two ends of 1..k+1 —
        // 1, k+1, 2, k, 3, k-1, ... — so their adjacent differences walk
        // down k, k-1, ..., 1, each distinct value exactly once. The values
        // k+2..n then follow in ascending order: the junction difference
        // falls back inside 1..k and every later difference is 1, so the
        // k values already seen are the final count.
        vector<int> answer;
        answer.reserve(n);
        int low = 1, high = k + 1;
        for (int i = 0; i <= k; ++i) {
            answer.push_back(i % 2 == 0 ? low++ : high--);
        }
        for (int v = k + 2; v <= n; ++v) {
            answer.push_back(v);
        }
        return answer;
    }
};
