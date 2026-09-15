class Solution {
  public:
    vector<string> wordsAbbreviation(vector<string> &words) {
        // Every word starts at a one-letter prefix: first character, count of
        // the middle, last character. Abbreviations can only clash between
        // equal-length words sharing that prefix and their last letter, and
        // the cure is collective — every clashing group grows its prefix by
        // one and re-groups, until each abbreviation stands alone.
        int n = words.size();
        vector<int> prefix(n, 1);
        auto abbreviate = [&](int i) {
            const string &word = words[i];
            int p = prefix[i];
            return word.substr(0, p) + to_string(word.size() - p - 1) + word.back();
        };
        while (true) {
            unordered_map<string, vector<int>> groups;
            for (int i = 0; i < n; ++i)
                groups[abbreviate(i)].push_back(i);
            bool unique = true;
            for (const auto &entry : groups)
                if (entry.second.size() > 1) {
                    unique = false;
                    for (int i : entry.second)
                        ++prefix[i];
                }
            if (unique)
                break;
        }
        vector<string> result;
        result.reserve(n);
        for (int i = 0; i < n; ++i) {
            string abbr = abbreviate(i);
            // An abbreviation no shorter than the word itself buys nothing.
            result.push_back(abbr.size() < words[i].size() ? abbr : words[i]);
        }
        return result;
    }
};
