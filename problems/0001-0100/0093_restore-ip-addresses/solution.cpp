class Solution {
  public:
    vector<string> restoreIpAddresses(string s) {
        vector<string> addresses;
        vector<string> segments;
        cut(s, 0, segments, addresses);
        return addresses;
    }

  private:
    void cut(const string &s, int start, vector<string> &segments, vector<string> &addresses) {
        int remaining = 4 - (int)segments.size();
        // What is left must feed 1-3 digits to every remaining segment; at
        // zero segments left this accepts only a fully consumed string.
        if (remaining > (int)s.size() - start || (int)s.size() - start > 3 * remaining) {
            return;
        }
        if (remaining == 0) {
            string address = segments[0];
            for (int i = 1; i < 4; ++i) {
                address += ".";
                address += segments[i];
            }
            addresses.push_back(address);
            return;
        }
        // Shorter cuts first: a dot sorts before any digit, so the output
        // lands in ascending lexicographic order.
        for (int length = 1; length <= 3; ++length) {
            if (start + length > (int)s.size()) {
                break;
            }
            string part = s.substr(start, length);
            // A segment is 0-255 with no leading zero unless it is exactly "0".
            if (part.size() > 1 && part[0] == '0') {
                continue;
            }
            int value = 0;
            for (char digit : part) {
                value = value * 10 + (digit - '0');
            }
            if (value > 255) {
                continue;
            }
            segments.push_back(part);
            cut(s, start + length, segments, addresses);
            segments.pop_back();
        }
    }
};
