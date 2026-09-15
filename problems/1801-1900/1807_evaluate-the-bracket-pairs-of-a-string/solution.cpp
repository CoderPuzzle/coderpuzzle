class Solution {
  public:
    string evaluate(string s, vector<vector<string>> &knowledge) {
        // One left-to-right pass: a '(' hands control to the matching ')',
        // the enclosed key goes through the map, everything else is copied
        // verbatim. Values are bracket-free, so nothing emitted is ever
        // re-examined.
        unordered_map<string, string> known;
        for (const auto &pair : knowledge) {
            known[pair[0]] = pair[1];
        }
        string out;
        out.reserve(s.size());
        size_t i = 0;
        while (i < s.size()) {
            if (s[i] == '(') {
                size_t j = s.find(')', i);
                auto it = known.find(s.substr(i + 1, j - i - 1));
                out += it != known.end() ? it->second : "?";
                i = j + 1;
            } else {
                out += s[i];
                i++;
            }
        }
        return out;
    }
};
