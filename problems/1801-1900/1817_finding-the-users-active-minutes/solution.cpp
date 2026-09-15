class Solution {
  public:
    vector<int> findingUsersActiveMinutes(vector<vector<int>> &logs, int k) {
        // A user's UAM is the size of the set of minutes they acted in, so one
        // pass grouping logs into per-user minute sets is all the counting
        // needed; each user then lands in exactly one answer bucket.
        unordered_map<int, unordered_set<int>> minutesByUser;
        for (const auto &log : logs) {
            minutesByUser[log[0]].insert(log[1]);
        }
        vector<int> answer(k, 0);
        for (const auto &[user, minutes] : minutesByUser) {
            // k covers every user's UAM by the constraints; the guard only
            // keeps a malformed k from writing out of range.
            if ((int)minutes.size() <= k) {
                answer[minutes.size() - 1]++;
            }
        }
        return answer;
    }
};
