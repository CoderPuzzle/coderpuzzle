class Solution {
  public:
    string minimumString(string a, string b, string c) {
        vector<string> raw{a, b, c};
        // A word already contained in another never extends a superstring,
        // so it is dropped (duplicates collapse with it).
        vector<string> words;
        for (const string &w : raw) {
            bool dup = false;
            for (const string &seen : words) {
                if (seen == w) {
                    dup = true;
                }
            }
            if (!dup) {
                words.push_back(w);
            }
        }
        vector<string> kept;
        for (const string &w : words) {
            bool contained = false;
            for (const string &t : words) {
                if (t != w && t.find(w) != string::npos) {
                    contained = true;
                }
            }
            if (!contained) {
                kept.push_back(w);
            }
        }
        if (kept.size() == 1) {
            return kept[0];
        }

        string best;
        for (int i = 0; i < (int)kept.size(); i++) {
            for (int j = 0; j < (int)kept.size(); j++) {
                if (j == i) {
                    continue;
                }
                // Chain the words in the order i -> j -> (the remaining
                // one); every optimal superstring lines up its words in
                // some such order with each pair joined on their full
                // overlap.
                string cur = merge(kept[i], kept[j]);
                for (int k = 0; k < (int)kept.size(); k++) {
                    if (k != i && k != j) {
                        cur = merge(cur, kept[k]);
                    }
                }
                if (best.empty() || make_pair(cur.size(), cur) < make_pair(best.size(), best)) {
                    best = cur;
                }
            }
        }
        return best;
    }

  private:
    static string merge(const string &x, const string &y) {
        // Largest k whose x-suffix equals y's prefix; k = 0 (plain
        // concatenation) always works as the fallback.
        int limit = min(x.size(), y.size());
        for (int k = limit; k > 0; k--) {
            if (x.substr(x.size() - k) == y.substr(0, k)) {
                return x + y.substr(k);
            }
        }
        return x + y;
    }
};
