class Solution {
  public:
    string findLexSmallestString(string s, int a, int b) {
        int n = static_cast<int>(s.size());
        unordered_set<string> seen;
        seen.insert(s);
        queue<string> q;
        q.push(s);
        string best = s;

        while (!q.empty()) {
            string cur = q.front();
            q.pop();
            if (cur < best) {
                best = cur;
            }

            string added = cur;
            for (int i = 1; i < n; i += 2) {
                int value = (added[i] - '0' + a) % 10;
                added[i] = static_cast<char>('0' + value);
            }
            if (seen.insert(added).second) {
                q.push(added);
            }

            string rotated = cur.substr(n - b) + cur.substr(0, n - b);
            if (seen.insert(rotated).second) {
                q.push(rotated);
            }
        }

        return best;
    }
};
