class Solution {

    public String removeTrailingZeros(String num) {
        // Walk backward from the end while the current digit is '0'; the
        // skipped suffix is exactly the trailing zeros. num represents a
        // positive integer with no leading zeros, so some digit is
        // non-zero and the scan always stops in bounds.
        int i = num.length() - 1;
        while (num.charAt(i) == '0') {
            --i;
        }
        return num.substring(0, i + 1);
    }
}
