class Solution {
  public:
    string addStrings(string num1, string num2) {
        // Schoolbook addition: walk both numbers from their right ends one
        // column at a time, add the two digits plus the carry, and emit
        // total % 10. The whole inputs are never converted to integers.
        int i = num1.size() - 1;
        int j = num2.size() - 1;
        int carry = 0;
        string digits;
        // Looping on "carry > 0" appends the final leading 1 when the sum
        // is one digit longer; each side contributes only while in range.
        while (i >= 0 || j >= 0 || carry > 0) {
            int total = carry;
            if (i >= 0) {
                total += num1[i] - '0';
                i--;
            }
            if (j >= 0) {
                total += num2[j] - '0';
                j--;
            }
            digits.push_back('0' + total % 10);
            carry = total / 10;
        }
        // Digits came out least-significant first; flip before returning.
        reverse(digits.begin(), digits.end());
        return digits;
    }
};
