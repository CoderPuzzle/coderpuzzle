class Solution {
  public:
    int minimumTeachings(int n, vector<vector<int>> &languages, vector<vector<int>> &friendships) {
        // Exactly one language may be taught, so a friendship that already
        // shares some language is settled forever and never forces teaching;
        // filter down to the needy pairs that share nothing. A chosen
        // language L fixes exactly the needy pairs whose both sides know L
        // afterwards, and a user lacking L is taught once however many
        // needy pairs it appears in — so the answer is the minimum, over
        // the n languages, of the users to teach.
        int users = (int)languages.size();
        vector<vector<bool>> known(users + 1, vector<bool>(n + 1, false));
        for (int user = 1; user <= users; ++user) {
            for (int language : languages[user - 1])
                known[user][language] = true;
        }
        vector<pair<int, int>> needy;
        for (const vector<int> &pair : friendships) {
            bool shares = false;
            for (int language = 1; language <= n && !shares; ++language) {
                shares = known[pair[0]][language] && known[pair[1]][language];
            }
            if (!shares)
                needy.emplace_back(pair[0], pair[1]);
        }
        int best = users;
        for (int language = 1; language <= n; ++language) {
            // taught[user] keeps each user lacking this language counted
            // once across every needy pair it takes part in.
            vector<bool> taught(users + 1, false);
            int count = 0;
            for (const auto &[u, v] : needy) {
                for (int user : {u, v}) {
                    if (!known[user][language] && !taught[user]) {
                        taught[user] = true;
                        ++count;
                    }
                }
            }
            best = min(best, count);
        }
        return best;
    }
};
