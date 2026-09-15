class Solution {
  public:
    vector<bool> transformStr(string s, vector<string> &qs) {
        int total = count(s.begin(), s.end(), '1');
        vector<bool> out;
        for (auto &q : qs) {
            int need = total - count(q.begin(), q.end(), '1'), wild = count(q.begin(), q.end(), '?');
            if (need < 0 || need > wild) {
                out.push_back(false);
                continue;
            }
            vector<char> one(q.size());
            for (int i = q.size() - 1; i >= 0 && need; i--)
                if (q[i] == '?') {
                    one[i] = 1;
                    need--;
                }
            int a = 0, b = 0;
            bool ok = 1;
            for (int i = 0; i < q.size(); i++) {
                a += s[i] == '1';
                b += q[i] == '1' || one[i];
                ok &= b <= a;
            }
            out.push_back(ok);
        }
        return out;
    }
};
