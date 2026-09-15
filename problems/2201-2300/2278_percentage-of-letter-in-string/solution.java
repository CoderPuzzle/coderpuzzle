class Solution {

    public int percentageLetter(String s, String letter) {
        // One pass counts the matches; multiplying before dividing keeps the
        // rounded-down percentage entirely in integer arithmetic.
        int count = 0;
        for (int index = 0; index < s.length(); index++) {
            if (s.charAt(index) == letter.charAt(0)) count++;
        }
        return (count * 100) / s.length();
    }
}
