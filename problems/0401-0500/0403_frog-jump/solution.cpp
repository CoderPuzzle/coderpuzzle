class Solution {
  public:
    bool canCross(vector<long long> &stones) {
        int n = (int)stones.size();
        unordered_map<long long, int> index;
        for (int i = 0; i < n; i++) {
            index[stones[i]] = i;
        }
        // jumps[i] = set of last-jump sizes that can land on stone i
        vector<unordered_set<long long>> jumps(n);
        jumps[0].insert(0);
        for (int i = 0; i < n; i++) {
            for (long long last : jumps[i]) {
                for (long long step : {last - 1, last, last + 1}) {
                    if (step <= 0)
                        continue;
                    long long target = stones[i] + step;
                    auto it = index.find(target);
                    if (it != index.end() && it->second > i) {
                        jumps[it->second].insert(step);
                    }
                }
            }
        }
        return !jumps[n - 1].empty();
    }
};
