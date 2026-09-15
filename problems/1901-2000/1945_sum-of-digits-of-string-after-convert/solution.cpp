class Solution {
  public:
    int getLucky(string s, int k) {
        // Convert letters to their 1..26 positions as a digit string, then
        // apply the digit-sum transform k times. The concatenated value
        // stays a string: 100 letters -> up to 200 digits, far beyond any
        // fixed-width integer.
        string digits;
        for (char ch : s) {
            digits += to_string(ch - 'a' + 1);
        }
        for (int i = 0; i < k; ++i) {
            int sum = 0;
            for (char d : digits) {
                sum += d - '0';
            }
            digits = to_string(sum);
        }
        return stoi(digits);
    }
};
