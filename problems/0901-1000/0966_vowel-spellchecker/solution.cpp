class Solution {
  public:
    vector<string> spellchecker(vector<string> &wordlist, vector<string> &queries) {
        // One pass over the wordlist builds all three lookups; emplace
        // keeps the FIRST word claiming each key — first-match-wins.
        unordered_set<string> exact;
        unordered_map<string, string> byLower;
        unordered_map<string, string> byDevowel;
        for (const auto &w : wordlist) {
            exact.insert(w);
            string low = toLower(w);
            byLower.emplace(low, w);
            byDevowel.emplace(devowel(low), w);
        }
        // Each query walks the tiers in precedence order: exact echo, then
        // case-insensitive, then vowel-blind, then "".
        vector<string> answer;
        answer.reserve(queries.size());
        for (const auto &q : queries) {
            if (exact.count(q)) {
                answer.push_back(q);
                continue;
            }
            string low = toLower(q);
            auto it = byLower.find(low);
            if (it != byLower.end()) {
                answer.push_back(it->second);
                continue;
            }
            auto dv = byDevowel.find(devowel(low));
            answer.push_back(dv == byDevowel.end() ? "" : dv->second);
        }
        return answer;
    }

  private:
    static string toLower(const string &s) {
        string out;
        out.reserve(s.size());
        for (char c : s)
            out.push_back((char)std::tolower((unsigned char)c));
        return out;
    }

    static string devowel(const string &low) {
        string out;
        out.reserve(low.size());
        for (char c : low)
            out.push_back(isVowel(c) ? '*' : c);
        return out;
    }

    static bool isVowel(char c) { return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u'; }
};
