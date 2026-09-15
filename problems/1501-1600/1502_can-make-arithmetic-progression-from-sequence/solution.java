import java.util.Arrays;

class Solution {

    public boolean canMakeArithmeticProgression(int[] arr) {
        // Sorting produces the one arrangement that could possibly be a
        // valid progression; check its consecutive gaps are all equal.
        int[] a = arr.clone();
        Arrays.sort(a);
        long diff = (long) a[1] - a[0];
        for (int i = 2; i < a.length; ++i) {
            if ((long) a[i] - a[i - 1] != diff) {
                return false;
            }
        }
        return true;
    }
}
