class Solution {

    public String removeSubstring(String s, int k) {
        // Run-length stack: each entry is one maximal run, char plus count.
        int[][] stack = new int[s.length()][2];
        int size = 0;
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (size > 0 && stack[size - 1][0] == ch) {
                stack[size - 1][1]++;
            } else {
                stack[size][0] = ch;
                stack[size][1] = 1;
                size++;
            }
            // A ')' run sitting on a '(' run is a live junction: cancel
            // min(open / k, close / k) whole blocks of k from both sides.
            while (size > 1 && stack[size - 1][0] == ')' && stack[size - 2][0] == '(') {
                int blocks = Math.min(stack[size - 2][1] / k, stack[size - 1][1] / k);
                if (blocks == 0) {
                    break;
                }
                int[] close = stack[--size];
                int[] below = stack[--size];
                below[1] -= blocks * k;
                close[1] -= blocks * k;
                // Survivors go back on top, merging equal-char neighbours; a
                // merge can expose another junction one level down.
                if (below[1] > 0) {
                    if (size > 0 && stack[size - 1][0] == below[0]) {
                        stack[size - 1][1] += below[1];
                    } else {
                        stack[size++] = below;
                    }
                }
                if (close[1] > 0) {
                    if (size > 0 && stack[size - 1][0] == close[0]) {
                        stack[size - 1][1] += close[1];
                    } else {
                        stack[size++] = close;
                    }
                }
            }
        }
        // The surviving runs are the irreducible string.
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < stack[i][1]; j++) {
                result.append((char) stack[i][0]);
            }
        }
        return result.toString();
    }
}
