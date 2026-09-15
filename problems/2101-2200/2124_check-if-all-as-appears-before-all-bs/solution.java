class Solution {

    public boolean checkString(String s) {
        boolean seenB = false;
        for (int index = 0; index < s.length(); index++) {
            if (s.charAt(index) == 'b') {
                seenB = true;
            } else if (seenB) {
                return false;
            }
        }
        return true;
    }
}
