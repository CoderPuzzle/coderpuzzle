class Solution {
  public:
    vector<int> timeTaken(vector<int> &arrival, vector<int> &state) {
        // Two FIFO queues fed by an arrival pointer (equal arrival seconds
        // enter index order automatically). prev_dir carries the direction
        // of the previous second: while both sides compete the door keeps
        // its streak, and exits win only when the door has just been idle.
        int n = arrival.size();
        queue<int> enterQ, exitQ;
        vector<int> ans(n);
        int i = 0;
        long long t = 0;
        int prev_dir = -1; // -1 unused, 0 entering, 1 exiting
        int done = 0;
        while (done < n) {
            while (i < n && (long long)arrival[i] <= t) {
                if (state[i] == 1)
                    exitQ.push(i);
                else
                    enterQ.push(i);
                i++;
            }
            if (enterQ.empty() && exitQ.empty()) {
                t = arrival[i]; // jump the clock; idle breaks any streak
                prev_dir = -1;
                continue;
            }
            int d;
            if (!enterQ.empty() && !exitQ.empty()) {
                d = prev_dir != -1 ? prev_dir : 1;
            } else {
                d = !exitQ.empty() ? 1 : 0;
            }
            queue<int> &q = d == 1 ? exitQ : enterQ;
            ans[q.front()] = (int)t;
            q.pop();
            prev_dir = d;
            done++;
            t++;
        }
        return ans;
    }
};
