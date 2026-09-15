class Solution {
  public:
    // Every reachable i contributes the interval [i+minJump, i+maxJump],
    // so "some source reaches j" is a range-count query; a rolling
    // prefix sum over reach[] answers it in O(1) per position.
    bool canReach(string s, int minJump, int maxJump) {
        int n = s.size();
        vector<int> pre(n + 1, 0);
        pre[1] = 1; // index 0 is reachable by definition
        for (int i = 1; i < n; i++) {
            long long hi = (long long)i - minJump;
            long long lo = (long long)i - maxJump;
            bool ok = false;
            if (s[i] == '0' && hi >= 0) {
                ok = pre[hi + 1] - pre[max(lo, 0LL)] > 0;
            }
            pre[i + 1] = pre[i] + (ok ? 1 : 0);
        }
        return pre[n] > pre[n - 1];
    }
};
