import java.util.Arrays;

class Solution {

    // `num` can hold 10^4 digits, far past any fixed-width integer, so the
    // addition runs schoolbook-style: right to left, one digit at a time,
    // with k itself seeding the running carry.
    public int[] addToArrayForm(int[] num, int k) {
        // at most max(num.length, 5) + 1 result digits, so num.length + 5
        // always suffices
        int[] digits = new int[num.length + 5];
        int count = 0;
        int carry = k;
        for (int i = num.length - 1; i >= 0; --i) {
            carry += num[i];
            digits[count] = carry % 10;
            ++count;
            carry /= 10;
        }
        // whatever of k outlives num keeps flowing out one digit at a time
        while (carry > 0) {
            digits[count] = carry % 10;
            ++count;
            carry /= 10;
        }
        // digits were emitted least-significant first: reverse the used
        // prefix in place, then trim the slack
        for (int left = 0, right = count - 1; left < right; ++left, --right) {
            int swap = digits[left];
            digits[left] = digits[right];
            digits[right] = swap;
        }
        return Arrays.copyOf(digits, count);
    }
}
