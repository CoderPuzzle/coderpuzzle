class Solution {

    public int lengthOfLastWord(String s) {
        // Walk in from the right: trailing spaces belong to no word, so skip
        // them, then count letters until a space or the start of the string.
        int i = s.length() - 1;
        while (i >= 0 && s.charAt(i) == ' ') {
            --i;
        }
        int end = i;
        while (i >= 0 && s.charAt(i) != ' ') {
            --i;
        }
        return end - i;
    }
}
