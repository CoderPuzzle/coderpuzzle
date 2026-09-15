class Solution {

    public String addStrings(String num1, String num2) {
        // Schoolbook addition: walk both numbers from their right ends one
        // column at a time, add the two digits plus the carry, and emit
        // total % 10. The whole inputs are never converted to integers.
        int i = num1.length() - 1;
        int j = num2.length() - 1;
        int carry = 0;
        StringBuilder digits = new StringBuilder();
        // Looping on "carry > 0" appends the final leading 1 when the sum
        // is one digit longer; each side contributes only while in range.
        while (i >= 0 || j >= 0 || carry > 0) {
            int total = carry;
            if (i >= 0) {
                total += num1.charAt(i) - '0';
                i--;
            }
            if (j >= 0) {
                total += num2.charAt(j) - '0';
                j--;
            }
            digits.append((char) ('0' + (total % 10)));
            carry = total / 10;
        }
        // Digits came out least-significant first; flip before returning.
        return digits.reverse().toString();
    }
}
