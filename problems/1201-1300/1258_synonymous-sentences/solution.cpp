class Solution {
  public:
    vector<string> generateSentences(vector<vector<string>> &synonyms, string text) {
        // Union-find over every word mentioned in a pair.
        map<string, string> parent;
        function<string(string)> find = [&](string x) {
            if (!parent.count(x))
                parent[x] = x;
            while (parent[x] != x) {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            return x;
        };
        for (const auto &pair : synonyms) {
            parent[find(pair[0])] = find(pair[1]);
        }

        map<string, set<string>> groups;
        for (const auto &[word, _] : parent) {
            (void)_;
            groups[find(word)].insert(word);
        }
        auto members = [&](const string &word) {
            if (parent.count(word))
                return vector<string>(groups[find(word)].begin(), groups[find(word)].end());
            return vector<string>{word};
        };

        // Expand position by position.
        vector<string> sentences{""};
        string word;
        istringstream in(text);
        while (in >> word) {
            vector<string> options = members(word);
            vector<string> next;
            next.reserve(sentences.size() * options.size());
            for (const auto &prefix : sentences) {
                for (const auto &option : options) {
                    next.push_back(prefix + " " + option);
                }
            }
            sentences = std::move(next);
        }
        vector<string> result;
        result.reserve(sentences.size());
        for (const auto &s : sentences) {
            result.push_back(s.substr(1));
        }
        sort(result.begin(), result.end());
        return result;
    }
};
