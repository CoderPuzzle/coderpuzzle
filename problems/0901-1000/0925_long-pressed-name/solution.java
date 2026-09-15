class Solution {

    public boolean isLongPressedName(String name, String typed) {
        // A long press only stretches a character into a run of copies of
        // itself. Walk both strings with two pointers: a typed character
        // equal to the next wanted one consumes it, a typed character equal
        // to its predecessor is a repeat of one already consumed, and
        // anything else cannot occur. Name must be fully consumed at the end.
        int i = 0,
            j = 0;
        int n = name.length(),
            m = typed.length();
        while (j < m) {
            if (i < n && name.charAt(i) == typed.charAt(j)) {
                i++;
                j++;
            } else if (j > 0 && typed.charAt(j) == typed.charAt(j - 1)) {
                j++; // a long press of the previous character
            } else {
                return false;
            }
        }
        return i == n;
    }
}
