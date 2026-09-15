class Solution {

    public boolean isFascinating(int n) {
        String digits = Integer.toString(n) + 2 * n + 3 * n;
        if (digits.length() != 9) return false;

        boolean[] seen = new boolean[10];
        for (int i = 0; i < digits.length(); ++i) {
            int digit = digits.charAt(i) - '0';
            if (digit == 0 || seen[digit]) return false;
            seen[digit] = true;
        }
        return true;
    }
}
