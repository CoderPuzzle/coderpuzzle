class Solution {

    public boolean canTransform(String start, String result) {
        // Walk both strings with two pointers, skipping the X's. The i-th
        // letter of start must be the i-th letter of result — L's and R's
        // never cross and never change kind — and each must move legally:
        // an L only ever moves left onto an X, an R only right onto an X.
        int i = 0,
            j = 0;
        int n = start.length(),
            m = result.length();
        while (true) {
            while (i < n && start.charAt(i) == 'X') {
                i++;
            }
            while (j < m && result.charAt(j) == 'X') {
                j++;
            }
            if (i == n || j == m) {
                return i == n && j == m;
            }
            if (start.charAt(i) != result.charAt(j)) {
                return false;
            }
            if (start.charAt(i) == 'L' && j > i) {
                return false; // this L would have to move right
            }
            if (start.charAt(i) == 'R' && j < i) {
                return false; // this R would have to move left
            }
            i++;
            j++;
        }
    }
}
