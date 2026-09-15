class Solution {

    public boolean isAdjacentDiffAtMostTwo(String s) {
        for (int i = 1; i < s.length(); i++) {
            if (Math.abs(s.charAt(i) - s.charAt(i - 1)) > 2) {
                return false;
            }
        }
        return true;
    }
}
