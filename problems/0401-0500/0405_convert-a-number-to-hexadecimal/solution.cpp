class Solution {
  public:
    string toHex(int num) {
        // Zero never enters the nibble loop, so it gets its own answer here.
        if (num == 0) {
            return "0";
        }
        // Reinterpret the bits as unsigned: a negative num is exactly the
        // two's-complement pattern the answer is read from.
        unsigned int value = num;
        const string alphabet = "0123456789abcdef";
        string digits;
        while (value != 0) {
            // Take the low nibble, then shift the rest down by one digit.
            digits.push_back(alphabet[value & 0xF]);
            value >>= 4;
        }
        // Nibbles come out lowest-first, so reverse for the answer.
        reverse(digits.begin(), digits.end());
        return digits;
    }
};
