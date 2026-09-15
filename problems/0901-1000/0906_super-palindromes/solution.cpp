class Solution {
  public:
    int superpalindromesInRange(string left, string right) {
        // The square root of a super-palindrome is itself a palindrome, so
        // the candidates come from the roots, never from the values: build
        // every palindromic root of up to nine digits by mirroring a half,
        // square it, and keep the squares that are palindromes inside the
        // range. Nine digits of root suffice because right is below 10^18
        // and the root of anything below 10^18 is below 10^9.
        long long low = stoll(left);
        long long high = stoll(right);
        int count = 0;
        for (int length = 1; length <= 9; length++) {
            int halfLength = (length + 1) / 2;
            for (long long half = pow10(halfLength - 1); half < pow10(halfLength); half++) {
                string digits = to_string(half);
                string mirrored = digits.substr(0, length - halfLength);
                reverse(mirrored.begin(), mirrored.end());
                long long root = stoll(digits + mirrored);
                // Every square fits a long long: roots stay below 10^9, so
                // the widest product is 999,999,999^2 < 10^18, an order of
                // magnitude inside long long's 9.22 * 10^18 ceiling.
                long long square = root * root;
                // Roots ascend across widths and halves alike, so squares
                // do too: the first square above `high` ends the scan.
                if (square > high) {
                    return count;
                }
                if (square >= low && isPalindrome(square)) {
                    count++;
                }
            }
        }
        return count;
    }

  private:
    static long long pow10(int exponent) {
        long long value = 1;
        while (exponent-- > 0) {
            value *= 10;
        }
        return value;
    }

    static bool isPalindrome(long long value) {
        string digits = to_string(value);
        return equal(digits.begin(), digits.begin() + digits.size() / 2, digits.rbegin());
    }
};
