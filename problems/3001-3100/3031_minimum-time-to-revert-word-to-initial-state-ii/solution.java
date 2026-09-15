class Solution {

    public int minimumTimeToInitialState(String word, int k) {
        int n = word.length();
        int[] fail = new int[n];
        int length = 0;
        for (int i = 1; i < n; i++) {
            char c = word.charAt(i);
            while (length > 0 && word.charAt(length) != c) {
                length = fail[length - 1];
            }
            if (word.charAt(length) == c) {
                length++;
            }
            fail[i] = length;
        }
        boolean[] isBorder = new boolean[n + 1];
        for (int cut = fail[n - 1]; cut > 0; cut = fail[cut - 1]) {
            isBorder[cut] = true;
        }
        int t = 1;
        while (t * k < n && !isBorder[n - t * k]) {
            t++;
        }
        return t;
    }
}
