class Solution {
  public:
    string toLowerCase(string s) {
        // ASCII puts every uppercase letter in 65..90 and its lowercase
        // twin 32 codes higher, so one pass decides each character:
        // inside the range, add 32; outside it, copy untouched. The
        // range check is what keeps the +32 from reaching digits,
        // punctuation, or already-lowercase letters.
        for (char &c : s) {
            if (c >= 'A' && c <= 'Z') {
                c = char(c + 32);
            }
        }
        return s;
    }
};
