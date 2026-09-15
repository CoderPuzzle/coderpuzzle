#include <algorithm>
#include <string>
#include <vector>

class Solution {
  public:
    string addBoldTag(string s, vector<string> &words) {
        // Every occurrence of every word paints its half-open interval onto a
        // boolean mask. Painting overlapping AND adjacent intervals onto one
        // mask merges them exactly as the two tag rules demand, so no interval
        // bookkeeping is needed. Each word is located by find-restart —
        // search again from one past every hit — because a single
        // non-restarting search would consume the overlapping occurrences
        // ("aa" inside "aaa" at both 0 and 1).
        int n = (int)s.size();
        vector<bool> bold(n, false);
        for (const string &word : words) {
            size_t length = word.size();
            for (size_t start = s.find(word); start != string::npos; start = s.find(word, start + 1)) {
                fill(bold.begin() + start, bold.begin() + start + length, true);
            }
        }
        string result;
        for (int i = 0; i < n; ++i) {
            if (bold[i] && (i == 0 || !bold[i - 1])) {
                result += "<b>";
            }
            result += s[i];
            if (bold[i] && (i == n - 1 || !bold[i + 1])) {
                result += "</b>";
            }
        }
        return result;
    }
};
