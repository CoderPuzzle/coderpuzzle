class Solution {
  public:
    vector<string> mostVisitedPattern(vector<string> &username, vector<int> &timestamp, vector<string> &website) {
        unordered_map<string, vector<pair<int, int>>> per_user; // user -> (time, index)
        for (int i = 0; i < (int)username.size(); ++i) {
            per_user[username[i]].push_back({timestamp[i], i});
        }
        map<vector<string>, set<string>> pattern_users;
        for (auto &[user, visits] : per_user) {
            sort(visits.begin(), visits.end());
            vector<string> sites;
            for (auto &entry : visits)
                sites.push_back(website[entry.second]);
            for (int i = 0; i < (int)sites.size(); ++i) {
                for (int j = i + 1; j < (int)sites.size(); ++j) {
                    for (int k = j + 1; k < (int)sites.size(); ++k)
                        pattern_users[{sites[i], sites[j], sites[k]}].insert(user);
                }
            }
        }
        vector<string> best;
        int best_score = -1;
        for (auto &[pattern, users] : pattern_users) {
            // map iterates keys in lexicographic order, so a strictly better
            // score replaces; an equal score keeps the earlier (smaller) key.
            if ((int)users.size() > best_score) {
                best = pattern;
                best_score = users.size();
            }
        }
        return best;
    }
};
