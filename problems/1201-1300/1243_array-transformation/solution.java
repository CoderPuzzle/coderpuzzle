class Solution {

    public int[] transformArray(int[] arr) {
        int[] current = arr;
        while (true) {
            // Whole day from a snapshot: neighbors are yesterday's values.
            int[] next = current.clone();
            for (int i = 1; i < current.length - 1; ++i) {
                if (current[i] < current[i - 1] && current[i] < current[i + 1]) {
                    next[i] = current[i] + 1;
                } else if (current[i] > current[i - 1] && current[i] > current[i + 1]) {
                    next[i] = current[i] - 1;
                }
            }
            if (java.util.Arrays.equals(next, current)) return current;
            current = next;
        }
    }
}
