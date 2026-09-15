class Solution {

    // A one-character window must span a whole maximal run: starting
    // inside the run leaves the same character before it, ending inside
    // leaves the same character after it. So the answer is "some maximal
    // run has length exactly k".
    public boolean hasSpecialSubstring(String s, int k) {
        int n = s.length();
        int i = 0;
        while (i < n) {
            int j = i;
            while (j < n && s.charAt(j) == s.charAt(i)) {
                j++;
            }
            if (j - i == k) {
                return true;
            }
            i = j;
        }
        return false;
    }
}
