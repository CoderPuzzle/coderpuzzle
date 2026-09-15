class Solution {
  public:
    vector<long long> maximumSegmentSum(vector<int> &nums, vector<int> &removeQueries) {
        int n = (int)nums.size();
        vector<int> parent(n);
        iota(parent.begin(), parent.end(), 0);
        vector<long long> ssum(n, 0);
        vector<char> active(n, 0);

        auto find = [&](int x) {
            while (parent[x] != x) {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            return x;
        };

        // Reverse time: removals become activations, so the process only
        // ever merges segments. The leading 0 is the answer after the last
        // removal, where nothing remains; skip removeQueries[0] (all other
        // positions are still active at that point).
        vector<long long> answer;
        answer.reserve(n);
        answer.push_back(0);
        long long best = 0;
        for (int qi = (int)removeQueries.size() - 1; qi >= 1; qi--) {
            int i = removeQueries[qi];
            active[i] = 1;
            ssum[i] = nums[i];
            // Merge with any active neighbor; the component total stays at
            // the new root, so ssum[find(i)] is the whole merged block.
            for (int j : {i - 1, i + 1}) {
                if (j >= 0 && j < n && active[j]) {
                    int a = find(i), b = find(j);
                    if (a != b) {
                        parent[a] = b;
                        ssum[b] += ssum[a];
                    }
                }
            }
            // Segments only grow along the reversed timeline, so the running
            // max is monotone — one max per step, nothing to evict.
            best = max(best, ssum[find(i)]);
            answer.push_back(best);
        }
        reverse(answer.begin(), answer.end());
        return answer;
    }
};
