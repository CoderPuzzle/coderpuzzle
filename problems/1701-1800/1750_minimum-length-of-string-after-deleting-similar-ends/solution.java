class Solution {

    public int minimumLength(String s) {
        // While both ends carry the same character, consume its full
        // run on each side in one sweep. The process is forced: shorter
        // strips only delay the same end state.
        int l = 0,
            r = s.length() - 1;
        while (l < r && s.charAt(l) == s.charAt(r)) {
            char c = s.charAt(l);
            while (l <= r && s.charAt(l) == c) {
                l++;
            }
            while (r >= l && s.charAt(r) == c) {
                r--;
            }
        }
        return r - l + 1;
    }
}
