import java.util.Arrays;

class Solution {

    public long smallestNumber(long num) {
        // The sign only picks the sort direction: a negative result is
        // smallest when its magnitude is largest (digits descending), a
        // positive one when the smallest nonzero digit leads and the
        // zeroes follow it instead of preceding it. The long parameter
        // holds every rebuilt value (|num| <= 10^15) with room to spare.
        if (num == 0) {
            return 0;
        }
        boolean negative = num < 0;
        long magnitude = negative ? -num : num;
        char[] digits = Long.toString(magnitude).toCharArray();
        Arrays.sort(digits);
        if (negative) {
            for (int left = 0, right = digits.length - 1; left < right; left++, right--) {
                char swap = digits[left];
                digits[left] = digits[right];
                digits[right] = swap;
            }
        } else {
            int index = 0;
            while (digits[index] == '0') {
                index++;
            }
            char swap = digits[0];
            digits[0] = digits[index];
            digits[index] = swap;
        }
        long value = 0;
        for (char digit : digits) {
            value = value * 10 + (digit - '0');
        }
        return negative ? -value : value;
    }
}
