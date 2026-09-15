class Solution {
  public:
    string reformatNumber(string number) {
        // Strip the separators, then group by remaining length: while more
        // than 4 digits remain, cut a block of 3; the final 4, 3, or 2
        // digits are forced — 4 splits into two blocks of 2, the rest
        // stay whole.
        string digits;
        for (char c : number) {
            if (c >= '0' && c <= '9') {
                digits += c;
            }
        }
        string out;
        out.reserve(digits.size() * 4 / 3 + 2);
        size_t i = 0;
        while (digits.size() - i > 4) {
            if (!out.empty()) {
                out += '-';
            }
            out += digits.substr(i, 3);
            i += 3;
        }
        if (!out.empty()) {
            out += '-';
        }
        if (digits.size() - i == 4) {
            out += digits.substr(i, 2);
            out += '-';
            out += digits.substr(i + 2, 2);
        } else {
            out += digits.substr(i);
        }
        return out;
    }
};
