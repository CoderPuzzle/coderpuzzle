import java.util.Arrays;

class Solution {

    public boolean checkIfCanBreak(String s1, String s2) {
        char[] a = s1.toCharArray();
        char[] b = s2.toCharArray();
        Arrays.sort(a);
        Arrays.sort(b);
        return dominates(a, b) || dominates(b, a);
    }

    private boolean dominates(char[] x, char[] y) {
        for (int i = 0; i < x.length; i++) {
            if (x[i] < y[i]) {
                return false;
            }
        }
        return true;
    }
}
