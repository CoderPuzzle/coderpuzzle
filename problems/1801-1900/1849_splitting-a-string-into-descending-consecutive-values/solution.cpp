#include <string>

class Solution {
  public:
    // Fixing the first piece forces everything after it: each next piece
    // must read as exactly prev - 1. Leading zeros let several lengths
    // share one value, so backtrack over each matching length. A first
    // piece of 11+ digits cannot work: its successor alone needs 10+ of
    // the at most 9 leftover characters.
    bool splitString(std::string s) {
        int n = s.size();
        for (int first_end = 1; first_end < std::min(n, 11); first_end++) {
            if (extend(s, first_end, std::stoll(s.substr(0, first_end)))) {
                return true;
            }
        }
        return false;
    }

  private:
    bool extend(const std::string &s, int pos, long long prev) {
        long long want = prev - 1;
        if (pos == (int)s.size()) {
            return true;
        }
        if (want < 0) {
            return false;
        }
        long long v = 0;
        for (int end = pos + 1; end <= (int)s.size(); end++) {
            v = v * 10 + (s[end - 1] - '0');
            if (v == want && extend(s, end, want)) {
                return true;
            }
            if (v > want) {
                break;
            }
        }
        return false;
    }
};
