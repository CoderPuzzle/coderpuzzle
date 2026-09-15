class Solution {
  public:
    int findMaxValueOfEquation(vector<vector<int>> &points, int k) {
        int n = points.size();
        // x is sorted increasing, so for i < j the equation value is
        // yj + xj + (yi - xi): the best partner maximizes the key y - x,
        // turning this into a sliding-window max over that key (deque kept
        // with y - x strictly decreasing, front = best candidate)
        vector<int> dq(n);
        int head = 0, tail = 0;
        long long best = LLONG_MIN;
        for (int j = 0; j < n; j++) {
            long long xj = points[j][0];
            long long yj = points[j][1];
            // drop stale front: x only grows, so anything beyond k behind
            // the current j is beyond k for every later j too
            while (head < tail && xj - points[dq[head]][0] > k) {
                head++;
            }
            if (head < tail) {
                long long xi = points[dq[head]][0];
                long long yi = points[dq[head]][1];
                long long value = yj + yi + xj - xi;
                if (value > best) {
                    best = value;
                }
            }
            // a back entry with key <= newcomer's can never win a future j;
            // popping ties is safe — the newer index has larger x, so it
            // stays inside the k-window at least as long
            while (head < tail && points[dq[tail - 1]][1] - points[dq[tail - 1]][0] <= yj - xj) {
                tail--;
            }
            dq[tail++] = j;
        }
        return (int)best;
    }
};
