class Solution {
  public:
    string toHexspeak(string num) {
        // Peel hex digits by repeated divmod — no format strings, so the
        // digit alphabet stays explicit: 0->O, 1->I, 10..15 -> A..F, and
        // digits 2..9 make the representation invalid.
        vector<int> digits;
        unsigned long long n = stoull(num);
        while (true) {
            digits.push_back(n % 16);
            n /= 16;
            if (n == 0) {
                break;
            }
        }
        string letters;
        for (int i = digits.size() - 1; i >= 0; i--) {
            int r = digits[i];
            if (r >= 2 && r <= 9) {
                return "ERROR";
            }
            if (r <= 1) {
                letters.push_back(r == 0 ? 'O' : 'I');
            } else {
                letters.push_back('A' + r - 10);
            }
        }
        return letters;
    }
};
