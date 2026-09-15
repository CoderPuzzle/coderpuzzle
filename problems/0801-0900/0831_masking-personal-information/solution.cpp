class Solution {
  public:
    string maskPII(string s) {
        // The '@' sign only appears in emails, so finding it settles
        // which of the two shapes the input is. An email answer keeps
        // the name's first and last letters and everything from the '@'
        // on, folds uppercase to lowercase by adding 32, and pins the
        // name's middle to five asterisks; the name is at least two
        // letters, so even "ab" wears the full five. A phone answer
        // needs only the digits: ten of them form the bare local number,
        // and each digit beyond ten contributes one masked asterisk
        // behind a '+', ahead of the shared "***-***-" tail and the
        // last four digits.
        size_t at = s.find('@');
        string out;
        if (at != string::npos) {
            for (size_t i = 0; i < s.size(); ++i) {
                // Position 1 opens the fixed five-asterisk middle; the
                // name's first and last letters and the whole domain
                // are the only characters kept.
                if (i == 1)
                    out += "*****";
                if (i == 0 || i >= at - 1) {
                    char c = s[i];
                    if (c >= 'A' && c <= 'Z')
                        c += 32;
                    out += c;
                }
            }
        } else {
            string digits;
            for (char c : s) {
                if (c >= '0' && c <= '9')
                    digits += c;
            }
            // Every digit past ten is one masked country-code star.
            if (digits.size() > 10) {
                out += '+';
                out.append(digits.size() - 10, '*');
                out += '-';
            }
            out += "***-***-";
            out += digits.substr(digits.size() - 4);
        }
        return out;
    }
};
