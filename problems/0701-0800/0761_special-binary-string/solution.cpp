#include <algorithm>
#include <functional>
#include <string>
#include <vector>

class Solution {
  public:
    string makeLargestSpecial(string s) {
        // A swap trades two adjacent special blocks, so the pieces that can
        // move are the top-level special substrings — mountains, each closed
        // exactly when the running count (+1 on '1', -1 on '0') returns to
        // zero. Maximize every mountain from the inside out: its inside is
        // itself special, because the count stays positive until the closing
        // '0', so recurse on the inside, re-wrap in the outer 1...0, and lay
        // the maximal mountains out largest-first.
        vector<string> parts;
        int count = 0;
        size_t start = 0;
        for (size_t i = 0; i < s.size(); ++i) {
            count += s[i] == '1' ? 1 : -1;
            if (count == 0) {
                // The climb: the outer 1...0 goes on only after the inside
                // is maximal — "11011000" wraps its maximized inside
                // "110010" into "11100100".
                parts.push_back("1" + makeLargestSpecial(s.substr(start + 1, i - start - 1)) + "0");
                start = i + 1;
            }
        }
        // Largest-first order is the largest concatenation of the fixed
        // maximal block set.
        sort(parts.begin(), parts.end(), greater<string>());
        string out;
        for (const string &part : parts) {
            out += part;
        }
        return out;
    }
};
