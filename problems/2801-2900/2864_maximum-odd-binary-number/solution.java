class Solution {

    public String maximumOddBinaryNumber(String s) {
        // Parity fixes the last bit: one '1' must sit in the final position,
        // so push every remaining '1' to the front and let all '0's slot in
        // between them and that trailing one.
        int ones = 0;
        for (int k = 0; k < s.length(); k++) {
            if (s.charAt(k) == '1') {
                ones++;
            }
        }
        StringBuilder result = new StringBuilder();
        for (int k = 0; k < ones - 1; k++) {
            result.append('1');
        }
        for (int k = 0; k < s.length() - ones; k++) {
            result.append('0');
        }
        result.append('1');
        return result.toString();
    }
}
