class Solution {
  public:
    vector<string> beforeAndAfterPuzzles(vector<string> &phrases) {
        int n = phrases.size();
        vector<vector<string>> words(n);
        for (int i = 0; i < n; i++) {
            string piece;
            stringstream stream(phrases[i]);
            while (stream >> piece) {
                words[i].push_back(piece);
            }
        }
        // File every phrase position under its first word: the bucket a
        // predecessor will search by its own last word.
        unordered_map<string, vector<int>> byFirst;
        for (int i = 0; i < n; i++) {
            byFirst[words[i][0]].push_back(i);
        }
        set<string> results;
        for (int i = 0; i < n; i++) {
            const string &last = words[i].back();
            auto found = byFirst.find(last);
            if (found == byFirst.end()) {
                continue;
            }
            for (int j : found->second) {
                if (j == i) {
                    continue; // a phrase never pairs with its own position
                }
                string merged = phrases[i];
                for (size_t k = 1; k < words[j].size(); k++) {
                    merged += " " + words[j][k];
                }
                results.insert(merged);
            }
        }
        return vector<string>(results.begin(), results.end());
    }
};
