class Solution {
    long long powerOfTen(int exponent) {
        long long value = 1;
        while (exponent-- > 0) {
            value *= 10;
        }
        return value;
    }

    long long makePalindrome(long long prefix, bool oddLength) {
        long long palindrome = prefix;
        long long remaining = oddLength ? prefix / 10 : prefix;
        while (remaining > 0) {
            palindrome = palindrome * 10 + remaining % 10;
            remaining /= 10;
        }
        return palindrome;
    }

    bool isBasePalindrome(long long value, int base) {
        long long original = value;
        long long reversed = 0;
        while (value > 0) {
            reversed = reversed * base + value % base;
            value /= base;
        }
        return reversed == original;
    }

  public:
    long long kMirror(int k, int n) {
        long long total = 0;
        int found = 0;
        for (int length = 1; found < n; ++length) {
            int halfLength = (length + 1) / 2;
            long long start = powerOfTen(halfLength - 1);
            long long end = powerOfTen(halfLength);
            for (long long prefix = start; prefix < end; ++prefix) {
                long long candidate = makePalindrome(prefix, length % 2 == 1);
                if (isBasePalindrome(candidate, k)) {
                    total += candidate;
                    if (++found == n) {
                        return total;
                    }
                }
            }
        }
        return total;
    }
};
