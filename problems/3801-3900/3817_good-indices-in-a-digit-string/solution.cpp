class Solution {
  public:
    vector<int> goodIndices(string s) {
        // A matching substring must be exactly as long as i's decimal
        // representation, so every index has just one candidate: the
        // suffix of that length ending at i. Comparing that window
        // against the digits of i decides the index — representations
        // never carry a leading zero, so a window like "01" fails
        // plainly against the real digits of i.
        vector<int> res;
        for (int i = 0; i < (int)s.size(); i++) {
            string t = to_string(i);
            int j = i - (int)t.size() + 1;
            if (j >= 0 && s.compare(j, t.size(), t) == 0) {
                res.push_back(i);
            }
        }
        return res;
    }
};
