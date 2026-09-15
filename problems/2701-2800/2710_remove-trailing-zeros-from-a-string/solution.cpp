class Solution {
  public:
    string removeTrailingZeros(string num) {
        // Walk backward from the end while the current digit is '0'; the
        // skipped suffix is exactly the trailing zeros. num represents a
        // positive integer with no leading zeros, so some digit is
        // non-zero and the scan always stops in bounds.
        size_t keep = num.size();
        while (num[keep - 1] == '0') {
            --keep;
        }
        return num.substr(0, keep);
    }
};
