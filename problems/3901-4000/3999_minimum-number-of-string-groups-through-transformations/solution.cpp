class Solution {
    string booth(string s) {
        if (s.empty())
            return s;
        string z = s + s;
        int n = s.size(), i = 0, j = 1, k = 0;
        while (i < n && j < n && k < n) {
            if (z[i + k] == z[j + k]) {
                k++;
                continue;
            }
            if (z[i + k] > z[j + k]) {
                i = i + k + 1;
                if (i == j)
                    i++;
            } else {
                j = j + k + 1;
                if (i == j)
                    j++;
            }
            k = 0;
        }
        int p = min(i, j);
        return z.substr(p, n);
    }

  public:
    int minimumGroups(vector<string> &words) {
        set<pair<string, string>> q;
        for (auto &w : words) {
            string a, b;
            for (int i = 0; i < w.size(); i++)
                (i % 2 ? b : a) += w[i];
            q.insert({booth(a), booth(b)});
        }
        return q.size();
    }
};
