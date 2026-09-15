#include <string>
#include <vector>

class Solution {
  public:
    int minValidStrings(vector<string> &words, string target) {
        // reach[i] is the largest L with target[i:i+L] a prefix of some word:
        // for each word, one Z-function over word + separator + target yields,
        // at every target offset, how many characters continue to match the
        // word's own prefix. With reach fixed, the pieces form a jump game:
        // standing at position i jumps right by any length in [1, reach[i]],
        // and the fewest jumps to cover n characters is the classic layered
        // greedy scan — every position folds its reach into the frontier
        // before the boundary trigger fires.
        int n = (int)target.size();
        vector<int> reach(n, 0);
        for (const string &w : words) {
            vector<int> values;
            values.reserve(w.size() + 1 + n);
            for (char ch : w) {
                values.push_back((unsigned char)ch);
            }
            values.push_back(-1);
            for (char ch : target) {
                values.push_back((unsigned char)ch);
            }
            vector<int> z = zFunction(values);
            int base = (int)w.size() + 1;
            for (int i = 0; i < n; i++) {
                if (z[base + i] > reach[i]) {
                    reach[i] = z[base + i];
                }
            }
        }
        int steps = 0;
        int curEnd = 0; // with `steps` pieces, target[:curEnd] is formable
        int farthest = 0;
        for (int i = 0; i < n; i++) {
            int r = i + reach[i];
            if (r > farthest) {
                farthest = r;
            }
            if (i == curEnd) {
                if (farthest <= curEnd) {
                    return -1;
                }
                steps++;
                curEnd = farthest;
                if (curEnd >= n) {
                    return steps;
                }
            }
        }
        return -1;
    }

  private:
    static vector<int> zFunction(const vector<int> &values) {
        int m = (int)values.size();
        vector<int> z(m, 0);
        z[0] = m;
        int left = 0, right = 0;
        for (int i = 1; i < m; i++) {
            if (i < right) {
                z[i] = min(right - i, z[i - left]);
            }
            while (i + z[i] < m && values[z[i]] == values[i + z[i]]) {
                z[i]++;
            }
            if (i + z[i] > right) {
                left = i;
                right = i + z[i];
            }
        }
        return z;
    }
};
