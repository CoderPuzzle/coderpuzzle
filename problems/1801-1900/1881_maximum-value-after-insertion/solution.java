class Solution {

    // Positive: insert before the first digit < x (else append).
    // Negative: insert before the first digit > x (else append).
    public String maxValue(String n, int x) {
        char d = (char) ('0' + x);
        boolean neg = n.charAt(0) == '-';
        for (int i = neg ? 1 : 0; i < n.length(); i++) {
            boolean better = neg ? n.charAt(i) > d : n.charAt(i) < d;
            if (better) {
                return n.substring(0, i) + d + n.substring(i);
            }
        }
        return n + d;
    }
}
