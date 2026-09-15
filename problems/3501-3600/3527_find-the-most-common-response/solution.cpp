class Solution {
  public:
    string findCommonResponse(vector<vector<string>> &responses) {
        // Deduplicate within each day first — a response repeated in the
        // same day still counts once — then tally the deduped words across
        // days in a hash map and keep the best (count, lexicographic order)
        // seen.
        unordered_map<string, int> counts;
        for (const vector<string> &day : responses) {
            unordered_set<string> unique(day.begin(), day.end());
            for (const string &word : unique)
                counts[word]++;
        }
        string bestWord;
        int bestCount = 0;
        for (const auto &entry : counts) {
            const string &word = entry.first;
            int count = entry.second;
            if (count > bestCount || (count == bestCount && word < bestWord)) {
                bestWord = word;
                bestCount = count;
            }
        }
        return bestWord;
    }
};
