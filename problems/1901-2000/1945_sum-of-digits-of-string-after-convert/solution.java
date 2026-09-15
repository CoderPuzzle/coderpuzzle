class Solution {

    public int getLucky(String s, int k) {
        // Convert letters to their 1..26 positions as a digit string, then
        // apply the digit-sum transform k times. The concatenated value
        // stays a string: 100 letters -> up to 200 digits, far beyond any
        // fixed-width integer.
        StringBuilder digits = new StringBuilder();
        for (char ch : s.toCharArray()) {
            digits.append(ch - 'a' + 1);
        }
        for (int i = 0; i < k; ++i) {
            int sum = 0;
            for (char d : digits.toString().toCharArray()) {
                sum += d - '0';
            }
            digits = new StringBuilder(Integer.toString(sum));
        }
        return Integer.parseInt(digits.toString());
    }
}
