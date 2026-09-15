class Solution {
  public:
    string getPermutation(int n, int k) {
        // Digits stay sorted, so the index computed below is the position of
        // the chosen digit among the digits still available.
        vector<int> digits;
        for (int value = 1; value <= n; value++)
            digits.push_back(value);
        // factorials[block] = block! — the size of one block at a position
        // with `block` positions still unfilled after it. 9! fits in 32 bits,
        // but the ranks ride in long long so nothing narrows on the way.
        vector<long long> factorials(n + 1);
        factorials[0] = 1;
        for (int value = 1; value <= n; value++)
            factorials[value] = factorials[value - 1] * value;
        long long rank = k - 1;
        string result;
        for (int block = n - 1; block >= 0; block--) {
            // Quotient picks the digit, remainder is the rank inside its block.
            long long index = rank / factorials[block];
            rank %= factorials[block];
            result += to_string(digits[index]);
            digits.erase(digits.begin() + index);
        }
        return result;
    }
};
