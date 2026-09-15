class Solution {
  public:
    vector<vector<int>> substringXorQueries(string s, vector<vector<int>> &queries) {
        // first ^ second <= 2^30 - 1 (both fit under 10^9), so only
        // substrings of at most 30 characters can ever match a query.
        // Sweeping lengths ascending records each decoded value the first
        // time it is seen, which is exactly the statement's pick: shortest
        // length, ties broken by the leftmost start. A 30-bit window
        // stays < 2^30, safely inside int.
        unordered_map<int, pair<int, int>> best;
        int n = (int)s.size();
        for (int length = 1; length <= min(30, n); ++length) {
            for (int left = 0; left + length <= n; ++left) {
                if (s[left] == '0' && length > 1) {
                    // "0xxx" decodes to xxx's value, which the previous,
                    // shorter pass already handled.
                    continue;
                }
                int val = 0;
                for (int k = left; k < left + length; ++k)
                    val = val * 2 + (s[k] - '0');
                if (!best.count(val))
                    best[val] = {left, left + length - 1};
            }
        }
        vector<vector<int>> answer;
        answer.reserve(queries.size());
        for (auto &q : queries) {
            int target = q[0] ^ q[1];
            auto found = best.find(target);
            if (found != best.end())
                answer.push_back({found->second.first, found->second.second});
            else
                answer.push_back({-1, -1});
        }
        return answer;
    }
};
