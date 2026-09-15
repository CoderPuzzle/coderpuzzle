class Solution {
  public:
    string concatHex36(int n) {
        // Widening to long long keeps the cubic product comfortably inside
        // range.
        return toBase(1LL * n * n, 16) + toBase(1LL * n * n * n, 36);
    }

  private:
    string toBase(long long x, int b) {
        static const string alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        // n >= 1 makes x >= 1, so the loop always emits at least one digit.
        string digits;
        while (x != 0) {
            digits.push_back(alphabet[x % b]);
            x /= b;
        }
        // Digits come out lowest-first, so reverse for the answer.
        reverse(digits.begin(), digits.end());
        return digits;
    }
};
