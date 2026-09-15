class Solution {
  public:
    vector<string> uncommonFromSentences(string s1, string s2) {
        // The pinned order is s1's words then s2's, and joining the
        // sentences with one space makes a single stream in that order.
        vector<string> words;
        istringstream stream(s1 + " " + s2);
        string word;
        while (stream >> word) {
            words.push_back(word);
        }
        unordered_map<string, int> counts;
        for (const string &w : words) {
            ++counts[w];
        }
        vector<string> result;
        // An uncommon word occurs exactly once overall, so emitting it at
        // its only occurrence is first-appearance order within each
        // sentence — no sort, no seen-list, no hash iteration order.
        for (const string &w : words) {
            if (counts[w] == 1) {
                result.push_back(w);
            }
        }
        return result;
    }
};
