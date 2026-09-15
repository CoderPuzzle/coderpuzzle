class Solution {

    public boolean canBeValid(String s, String locked) {
        if (s.length() % 2 == 1) {
            return false;
        }
        int minimum = 0;
        int maximum = 0;
        for (int index = 0; index < s.length(); index++) {
            if (locked.charAt(index) == '0') {
                minimum--;
                maximum++;
            } else if (s.charAt(index) == '(') {
                minimum++;
                maximum++;
            } else {
                minimum--;
                maximum--;
            }
            if (maximum < 0) {
                return false;
            }
            minimum = Math.max(minimum, 0);
        }
        return minimum == 0;
    }
}
