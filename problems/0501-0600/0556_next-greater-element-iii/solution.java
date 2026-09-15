class Solution {

    public int nextGreaterElement(int n) {
        // Rearranging n's digits, the answer is the immediate successor of
        // n's digit string among all rearrangements — the classic
        // next-permutation step. Scan from the right for the first digit
        // below its right neighbor (the pivot); none means the digits are
        // entirely non-increasing and n is already the largest arrangement.
        // The suffix past the pivot is non-increasing, so the smallest digit
        // larger than the pivot is the rightmost one that beats it: swap the
        // two, then reverse the (still non-increasing) suffix to sort it
        // ascending — the smallest tail those digits can form.
        char[] digits = Integer.toString(n).toCharArray();
        int i = digits.length - 2;
        while (i >= 0 && digits[i] >= digits[i + 1]) {
            i--;
        }
        if (i < 0) {
            return -1;
        }
        int j = digits.length - 1;
        while (digits[j] <= digits[i]) {
            j--;
        }
        char temp = digits[i];
        digits[i] = digits[j];
        digits[j] = temp;
        for (int lo = i + 1, hi = digits.length - 1; lo < hi; lo++, hi--) {
            char swap = digits[lo];
            digits[lo] = digits[hi];
            digits[hi] = swap;
        }
        // n reaches 2³¹ - 1 (ten digits) and the successor can run one digit
        // wider, so the rebuilt value — up to 9,999,999,999, past int — is
        // held in a long and checked against the 32-bit ceiling before it is
        // returned.
        long result = Long.parseLong(new String(digits));
        return result <= 2147483647 ? (int) result : -1;
    }
}
