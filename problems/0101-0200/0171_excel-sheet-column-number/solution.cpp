class Solution {
  public:
    int titleToNumber(string columnTitle) {
        // Bijective base-26, decode side: each letter is a digit worth 1..26,
        // so Horner's rule folds the title with no off-by-one repair.
        int number = 0;
        for (char letter : columnTitle) {
            // Shift the digits so far one place left, then add this one.
            number = number * 26 + (letter - 'A' + 1);
        }
        // The "FXSHRXW" ceiling is exactly 2^31 - 1, so the fold stays in range.
        return number;
    }
};
