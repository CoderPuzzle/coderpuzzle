class Solution {

    public boolean validDigit(int n, int x) {
        String digits = Integer.toString(n);
        char target = (char) ('0' + x);
        return digits.indexOf(target) >= 0 && digits.charAt(0) != target;
    }
}
