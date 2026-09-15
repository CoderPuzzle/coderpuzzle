class Solution {
  public:
    bool areSentencesSimilar(vector<string> &sentence1, vector<string> &sentence2,
                             vector<vector<string>> &similarPairs) {
        // Different lengths can never be similar.
        if (sentence1.size() != sentence2.size())
            return false;

        // Words are bare English letters, so '|' cannot occur inside one:
        // x + "|" + y is a collision-free key for the ordered pair. Both
        // orientations enter the set — the relation is symmetric — so one
        // lookup answers "was this pair declared?".
        unordered_set<string> declared;
        for (const auto &pair : similarPairs) {
            declared.insert(pair[0] + "|" + pair[1]);
            declared.insert(pair[1] + "|" + pair[0]);
        }

        for (size_t i = 0; i < sentence1.size(); i++) {
            const string &a = sentence1[i];
            const string &b = sentence2[i];
            // A word is always similar to itself; anything else must be a
            // declared pair. Nothing chains: big~large and large~huge never
            // make big~huge.
            if (a != b && declared.find(a + "|" + b) == declared.end()) {
                return false;
            }
        }
        return true;
    }
};
