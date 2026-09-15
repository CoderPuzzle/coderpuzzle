class Solution {
  public:
    long long minInitialStrength(vector<int> &monsters, vector<vector<int>> &boosts) {
        int n = monsters.size();
        vector<long long> delta(n + 1, 0);
        for (const auto &boost : boosts) {
            delta[boost[0]] += boost[2];
            delta[boost[1] + 1] -= boost[2];
        }

        long long bonus = 0;
        long long prefix = 0;
        long long answer = 0;
        for (int i = 0; i < n; ++i) {
            bonus += delta[i];
            long long needed = monsters[i] - bonus;
            if (needed > 0) {
                answer = max(answer, prefix + needed);
            }
            prefix += monsters[i];
        }
        return answer;
    }
};
