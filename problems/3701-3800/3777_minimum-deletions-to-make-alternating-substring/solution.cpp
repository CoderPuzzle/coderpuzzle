class Solution {
  public:
    vector<int> minDeletions(string s, vector<vector<int>> &queries) {
        // eq[i] = 1 iff i >= 1 and s[i] == s[i - 1]. Deleting one character
        // per equal adjacent pair is optimal, so the type-2 answer over
        // s[l..r] is exactly sum(eq[l+1..r]). A Fenwick tree over eq answers
        // each query in O(log n), and flipping s[j] only ever changes eq[j]
        // and eq[j + 1], because every other adjacency is untouched.
        int n = (int)s.size();
        vector<int> cur(n, 0), bits(n, 0);
        auto add = [&](int i, int delta) {
            for (; i < n; i += i & -i)
                bits[i] += delta;
        };
        auto pref = [&](int i) {
            int total = 0;
            for (; i > 0; i -= i & -i)
                total += bits[i];
            return total;
        };
        auto setEq = [&](int i, int value) {
            if (i >= 1 && i < n && cur[i] != value) {
                add(i, value - cur[i]);
                cur[i] = value;
            }
        };
        for (int i = 1; i < n; i++) {
            cur[i] = s[i] == s[i - 1] ? 1 : 0;
            if (cur[i])
                add(i, 1);
        }
        vector<char> chars(s.begin(), s.end());
        vector<int> answer;
        answer.reserve(queries.size());
        for (const auto &query : queries) {
            if (query[0] == 1) {
                int j = query[1];
                chars[j] = chars[j] == 'A' ? 'B' : 'A';
                if (j + 1 < n) {
                    setEq(j + 1, chars[j + 1] == chars[j] ? 1 : 0);
                }
                setEq(j, j >= 1 && chars[j] == chars[j - 1] ? 1 : 0);
            } else {
                answer.push_back(pref(query[2]) - pref(query[1]));
            }
        }
        return answer;
    }
};
