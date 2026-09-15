class Solution {
  public:
    string largestOddNumber(string num) {
        // The largest odd substring must be a prefix: `num` has no
        // leading zeros, so a longer number always outvalues a shorter
        // one, and the best candidate starts at index 0. A prefix is
        // odd exactly when it ends on an odd digit, so the answer is
        // the prefix ending at the rightmost odd digit — any earlier
        // cut is shorter, any later one is even. One backward scan
        // finds that cut; no odd digit at all means no odd substring
        // exists and the answer is empty. Only characters are
        // compared, so the 10^5-digit bound never becomes arithmetic
        // in any language.
        for (int i = (int)num.size() - 1; i >= 0; --i) {
            if ((num[i] - '0') % 2 == 1) {
                return num.substr(0, i + 1);
            }
        }
        return "";
    }
};
