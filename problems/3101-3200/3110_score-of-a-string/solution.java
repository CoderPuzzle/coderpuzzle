class Solution {

    public int scoreOfString(String s) {
        int total = 0;
        for (int i = 1; i < s.length(); i++) {
            total += Math.abs(s.charAt(i) - s.charAt(i - 1));
        }
        return total;
    }
}
