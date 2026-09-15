class Solution {

    public long kMirror(int k, int n) {
        long total = 0;
        int found = 0;
        int length = 1;
        while (found < n) {
            int halfLength = (length + 1) / 2;
            long start = powerOfTen(halfLength - 1);
            long end = powerOfTen(halfLength);
            for (long prefix = start; prefix < end; prefix++) {
                long candidate = makePalindrome(prefix, length % 2 == 1);
                if (isBasePalindrome(candidate, k)) {
                    total += candidate;
                    found++;
                    if (found == n) {
                        return total;
                    }
                }
            }
            length++;
        }
        return total;
    }

    private long powerOfTen(int exponent) {
        long value = 1;
        while (exponent-- > 0) {
            value *= 10;
        }
        return value;
    }

    private long makePalindrome(long prefix, boolean oddLength) {
        long palindrome = prefix;
        long remaining = oddLength ? prefix / 10 : prefix;
        while (remaining > 0) {
            palindrome = palindrome * 10 + (remaining % 10);
            remaining /= 10;
        }
        return palindrome;
    }

    private boolean isBasePalindrome(long value, int base) {
        long original = value;
        long reversed = 0;
        while (value > 0) {
            reversed = reversed * base + (value % base);
            value /= base;
        }
        return reversed == original;
    }
}
