class Solution {

    public String generateTheString(int n) {
        char[] out = new char[n];
        java.util.Arrays.fill(out, 0, n, 'a');
        if (n % 2 == 0) out[n - 1] = 'b';
        return new String(out);
    }
}
