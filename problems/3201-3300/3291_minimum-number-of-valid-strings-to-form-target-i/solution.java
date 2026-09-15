class Solution {

    public int minValidStrings(String[] words, String target) {
        // reach[i] is the largest L with target[i:i+L] a prefix of some word:
        // for each word, one Z-function over word + separator + target yields,
        // at every target offset, how many characters continue to match the
        // word's own prefix. With reach fixed, the pieces form a jump game:
        // standing at position i jumps right by any length in [1, reach[i]],
        // and the fewest jumps to cover n characters is the classic layered
        // greedy scan — every position folds its reach into the frontier
        // before the boundary trigger fires.
        int n = target.length();
        int[] reach = new int[n];
        for (String w : words) {
            int[] values = new int[w.length() + 1 + n];
            for (int k = 0; k < w.length(); k++) {
                values[k] = w.charAt(k);
            }
            values[w.length()] = -1;
            for (int k = 0; k < n; k++) {
                values[w.length() + 1 + k] = target.charAt(k);
            }
            int[] z = zFunction(values);
            int base = w.length() + 1;
            for (int i = 0; i < n; i++) {
                if (z[base + i] > reach[i]) {
                    reach[i] = z[base + i];
                }
            }
        }
        int steps = 0;
        int curEnd = 0; // with `steps` pieces, target[:curEnd] is formable
        int farthest = 0;
        for (int i = 0; i < n; i++) {
            int r = i + reach[i];
            if (r > farthest) {
                farthest = r;
            }
            if (i == curEnd) {
                if (farthest <= curEnd) {
                    return -1;
                }
                steps++;
                curEnd = farthest;
                if (curEnd >= n) {
                    return steps;
                }
            }
        }
        return -1;
    }

    private static int[] zFunction(int[] values) {
        int m = values.length;
        int[] z = new int[m];
        z[0] = m;
        int left = 0,
            right = 0;
        for (int i = 1; i < m; i++) {
            if (i < right) {
                z[i] = Math.min(right - i, z[i - left]);
            }
            while (i + z[i] < m && values[z[i]] == values[i + z[i]]) {
                z[i]++;
            }
            if (i + z[i] > right) {
                left = i;
                right = i + z[i];
            }
        }
        return z;
    }
}
