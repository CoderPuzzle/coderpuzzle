class Solution {
  public:
    int countDistinct(string s) {
        // Suffix automaton: each state v other than the root owns exactly the
        // len[v] - len[link[v]] substrings in its endpos equivalence class,
        // and every distinct substring belongs to exactly one class, so the
        // answer is the sum of those class sizes. Clones created while
        // splitting a transition are ordinary states and count the same way.
        int n = s.size();
        int cap = 2 * n;
        vector<int> length(cap, 0);
        vector<int> link(cap, -1);
        // 0 doubles as "no transition": no edge ever points at the root.
        vector<array<int, 26>> trans(cap);
        int size = 1;
        int last = 0;
        for (int i = 0; i < n; i++) {
            int c = s[i] - 'a';
            int cur = size++;
            length[cur] = length[last] + 1;
            int p = last;
            while (p != -1 && trans[p][c] == 0) {
                trans[p][c] = cur;
                p = link[p];
            }
            if (p == -1) {
                link[cur] = 0;
            } else {
                int q = trans[p][c];
                if (length[p] + 1 == length[q]) {
                    link[cur] = q;
                } else {
                    // q is too deep to be cur's suffix link: copy it as a
                    // shallower clone, redirect the family's transitions,
                    // then hang both q and cur under the clone.
                    int clone = size++;
                    length[clone] = length[p] + 1;
                    link[clone] = link[q];
                    trans[clone] = trans[q];
                    while (p != -1 && trans[p][c] == q) {
                        trans[p][c] = clone;
                        p = link[p];
                    }
                    link[q] = clone;
                    link[cur] = clone;
                }
            }
            last = cur;
        }
        int answer = 0;
        for (int v = 1; v < size; v++) {
            answer += length[v] - length[link[v]];
        }
        return answer;
    }
};
