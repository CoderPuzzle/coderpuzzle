class Solution {
  public:
    string lexSmallestAfterDeletion(string s) {
        // A letter occurring once can never be deleted, and any letter can
        // be deleted down to a single occurrence, so the reachable strings
        // are exactly the subsequences that keep every distinct letter.
        // Build the smallest one letter by letter: take the smallest letter
        // whose earliest remaining occurrence still leaves every
        // not-yet-taken letter an occurrence after it.
        int n = (int)s.size();
        vector<vector<int>> pos(26);
        for (int i = 0; i < n; i++) {
            pos[s[i] - 'a'].push_back(i);
        }
        vector<int> todo;
        for (int c = 0; c < 26; c++) {
            if (!pos[c].empty()) {
                todo.push_back(c);
            }
        }
        vector<int> ptr(26, 0);
        string out;
        int p = -1;
        while (!todo.empty()) {
            // Two smallest last-occurrence deadlines among needed letters.
            int m1 = n, m2 = n, d1 = -1;
            for (int c : todo) {
                int lc = pos[c].back();
                if (lc < m1) {
                    m2 = m1;
                    m1 = lc;
                    d1 = c;
                } else if (lc < m2) {
                    m2 = lc;
                }
            }
            for (int c = 0; c < 26; c++) {
                vector<int> &lst = pos[c];
                int j = ptr[c];
                while (j < (int)lst.size() && lst[j] <= p) {
                    j++;
                }
                ptr[c] = j;
                if (j == (int)lst.size()) {
                    continue;
                }
                // Taking occurrence q must not strand a needed letter.
                int q = lst[j];
                int lim = (c == d1) ? m2 : m1;
                if (q < lim) {
                    out.push_back('a' + c);
                    p = q;
                    for (size_t k = 0; k < todo.size(); k++) {
                        if (todo[k] == c) {
                            todo.erase(todo.begin() + k);
                            break;
                        }
                    }
                    break;
                }
            }
        }
        return out;
    }
};
