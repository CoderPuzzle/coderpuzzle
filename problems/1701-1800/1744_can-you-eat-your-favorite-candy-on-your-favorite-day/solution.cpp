class Solution {
  public:
    vector<bool> canEat(vector<int> &candiesCount, vector<vector<int>> &queries) {
        // Prefix sums: pref[i] is the total candies in types 0 .. i-1.
        // The earliest day type t can be touched is pref[t] / cap (eat cap
        // every day); the latest is pref[t] + candiesCount[t] - 1 (eat one
        // every day). The query holds iff favoriteDay lies in that window.
        // Prefix sums reach 1e10, so they are held in 64-bit integers.
        int n = candiesCount.size();
        vector<long long> pref(n + 1, 0);
        for (int i = 0; i < n; ++i)
            pref[i + 1] = pref[i] + candiesCount[i];
        vector<bool> answer;
        answer.reserve(queries.size());
        for (auto &q : queries) {
            int t = q[0], day = q[1], cap = q[2];
            long long earliest = pref[t] / cap;
            long long latest = pref[t] + candiesCount[t] - 1;
            answer.push_back(earliest <= day && day <= latest);
        }
        return answer;
    }
};
