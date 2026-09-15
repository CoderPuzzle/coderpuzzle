class Solution {

    // Each operation is a local rule: replace every adjacent pair with its
    // sum mod 10, shrinking the digit list by one. With at most 100 digits
    // the whole reduction is at most ~5000 additions, so simulate it
    // directly and compare the two survivors.
    public boolean hasSameDigits(String s) {
        int n = s.length();
        int[] d = new int[n];
        for (int i = 0; i < n; i++) {
            d[i] = s.charAt(i) - '0';
        }
        while (n > 2) {
            for (int i = 0; i + 1 < n; i++) {
                d[i] = (d[i] + d[i + 1]) % 10;
            }
            n--;
        }
        return d[0] == d[1];
    }
}
