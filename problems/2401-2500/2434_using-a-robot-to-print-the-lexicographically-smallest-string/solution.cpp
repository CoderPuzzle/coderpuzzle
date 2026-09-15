class Solution {
  public:
    string robotWithString(string s) {
        int n = s.size();
        // t behaves as a stack: characters enter in s's order and leave
        // from the end, so the paper receives some pop sequence.
        // suffixMin[i] = smallest char still to arrive from s[i:]; the
        // sentinel at n exceeds every letter and also serves the drain.
        vector<char> suffixMin(n + 1, 127);
        for (int i = n - 1; i >= 0; i--) {
            suffixMin[i] = min(s[i], suffixMin[i + 1]);
        }
        string st;
        string out;
        out.reserve(n);
        for (int i = 0; i < n; i++) {
            // Pop the top while nothing smaller remains unread: writing it
            // now is never wrong, since later arrivals are >= top. Ties pop
            // early too — safe and never a wasted hold.
            while (!st.empty() && st.back() <= suffixMin[i]) {
                out.push_back(st.back());
                st.pop_back();
            }
            st.push_back(s[i]);
        }
        // Input exhausted: flush the rest (the sentinel makes this the
        // same condition as the main loop).
        while (!st.empty()) {
            out.push_back(st.back());
            st.pop_back();
        }
        return out;
    }
};
