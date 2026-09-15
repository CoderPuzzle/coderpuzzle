class Solution {
  public:
    vector<int> beautifulIndices(string s, string a, string b, int k) {
        auto occurrences = [](const string &pattern, const string &text) {
            int m = (int)pattern.size();
            // KMP failure function: pi[i] is the length of the longest proper
            // prefix of pattern[0..i] that is also its suffix.
            vector<int> pi(m, 0);
            int matched = 0;
            for (int i = 1; i < m; i++) {
                while (matched > 0 && pattern[i] != pattern[matched])
                    matched = pi[matched - 1];
                if (pattern[i] == pattern[matched])
                    matched++;
                pi[i] = matched;
            }
            // One scan of text; on a full match the failure function keeps
            // the scan going instead of restarting, so periodic texts stay
            // linear.
            vector<int> starts;
            matched = 0;
            for (int i = 0; i < (int)text.size(); i++) {
                while (matched > 0 && text[i] != pattern[matched])
                    matched = pi[matched - 1];
                if (text[i] == pattern[matched])
                    matched++;
                if (matched == m) {
                    starts.push_back(i - m + 1);
                    matched = pi[matched - 1];
                }
            }
            return starts;
        };
        vector<int> inA = occurrences(a, s);
        vector<int> inB = occurrences(b, s);
        vector<int> result;
        // Both lists ascend and i - k grows along inA, so the first
        // b-occurrence at or after i - k only moves forward: one merge-style
        // pass tests each window [i - k, i + k] in amortized constant time.
        int low = 0;
        for (int i : inA) {
            while (low < (int)inB.size() && inB[low] < i - k)
                low++;
            if (low < (int)inB.size() && inB[low] <= i + k)
                result.push_back(i);
        }
        return result;
    }
};
