class Solution {

    public boolean checkOnesSegment(String s) {
        // A segment is a maximal run of ones; a new one starts wherever
        // a '1' follows a '0'. Bail out as soon as a second starts.
        int segments = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '1' && (i == 0 || s.charAt(i - 1) == '0')) {
                segments++;
                if (segments > 1) {
                    return false;
                }
            }
        }
        return true;
    }
}
