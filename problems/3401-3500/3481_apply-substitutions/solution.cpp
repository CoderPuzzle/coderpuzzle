class Solution {
  public:
    string applySubstitutions(vector<vector<string>> &replacements, string text) {
        // The replacements form a DAG on keys: expand(key) renders its raw
        // value, recursing into each %X% reference exactly once via the memo.
        map<string, string> raw;
        for (const auto &pair : replacements) {
            raw[pair[0]] = pair[1];
        }
        map<string, string> done;
        string out;
        size_t i = 0;
        while (i < text.size()) {
            if (text[i] == '%') {
                out += expand(text.substr(i + 1, 1), raw, done);
                i += 3;
            } else {
                out += text[i];
                i += 1;
            }
        }
        return out;
    }

  private:
    // %K% placeholders are three characters wide (single-letter keys), so
    // one linear scan splits a value into literals and one-char references.
    string expand(const string &key, map<string, string> &raw, map<string, string> &done) {
        if (auto it = done.find(key); it != done.end()) {
            return it->second;
        }
        const string &value = raw[key];
        string out;
        size_t i = 0;
        while (i < value.size()) {
            if (value[i] == '%') {
                out += expand(value.substr(i + 1, 1), raw, done);
                i += 3;
            } else {
                out += value[i];
                i += 1;
            }
        }
        done[key] = out;
        return out;
    }
};
