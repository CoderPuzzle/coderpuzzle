class Solution {
  public:
    string minRemoveToMakeValid(string s) {
        int n = (int)s.size();
        vector<bool> keep(n, true);
        vector<int> opens; // indices of '(' still hoping for a partner
        for (int i = 0; i < n; ++i) {
            if (s[i] == '(')
                opens.push_back(i);
            else if (s[i] == ')') {
                if (!opens.empty())
                    opens.pop_back(); // matched: both survive
                else
                    keep[i] = false; // orphan close, doomed
            }
        }
        for (int i : opens)
            keep[i] = false; // opens that never found a close
        string out;
        out.reserve(n);
        for (int i = 0; i < n; ++i) {
            if (keep[i])
                out.push_back(s[i]);
        }
        return out;
    }
};
