class Solution {

    public int minAnagramLength(String s) {
        // t repeats, so len(t) = L divides n = len(s) and every n / L
        // chunk must carry the same letter multiset as the first chunk:
        // sweep the divisors of n ascending and take the first survivor.
        // A running count that exceeds the first chunk's count already
        // proves the chunk differs, so failed candidates die early.
        int n = s.length();
        char[] arr = s.toCharArray();
        for (int length = 1; length <= n; length++) {
            if (n % length != 0 || !works(arr, n, length)) {
                continue;
            }
            return length;
        }
        return n;
    }

    private boolean works(char[] arr, int n, int length) {
        int[] base = new int[26];
        for (int i = 0; i < length; i++) {
            base[arr[i] - 'a']++;
        }
        int[] run = new int[26];
        int filled = 0;
        for (int i = 0; i < n; i++) {
            int c = arr[i] - 'a';
            if (++run[c] > base[c]) {
                return false;
            }
            if (++filled == length) {
                if (!java.util.Arrays.equals(run, base)) {
                    return false;
                }
                java.util.Arrays.fill(run, 0);
                filled = 0;
            }
        }
        return filled == 0;
    }
}
