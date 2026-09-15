class Solution {
  public:
    bool circularArrayLoop(vector<int> &nums) {
        int n = (int)nums.size();
        // Every index has exactly one successor, so each walk either closes
        // a loop or dies; 0 unseen, 1 on the current walk, 2 proven dead.
        vector<int> state(n, 0);
        for (int start = 0; start < n; ++start) {
            if (state[start] != 0)
                continue;
            vector<int> path;
            int node = start;
            while (state[node] == 0) {
                state[node] = 1;
                path.push_back(node);
                int next = ((node + nums[node]) % n + n) % n;
                // A legal loop keeps one direction and more than one node,
                // so a sign flip or a hop back to self kills this chain.
                if (nums[next] * nums[node] < 0 || next == node)
                    break;
                node = next;
                if (state[node] == 1)
                    return true;
            }
            for (int walked : path)
                state[walked] = 2;
        }
        return false;
    }
};
