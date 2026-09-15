class Solution {

    public int[] simulationResult(int[] windows, int[] queries) {
        // The final stack lists windows by their most recent last touch,
        // with never-queried windows keeping their original order below.
        // Reading the queries backwards and appending each window not yet
        // appended emits exactly that: last touches newest-first, earlier
        // presses skipped because only the final press sets a window's
        // height. The second pass over windows appends the untouched rest
        // in its original order.
        boolean[] seen = new boolean[windows.length + 1];
        int[] result = new int[windows.length];
        int count = 0;
        for (int i = queries.length - 1; i >= 0; --i) {
            if (!seen[queries[i]]) {
                seen[queries[i]] = true;
                result[count++] = queries[i];
            }
        }
        for (int window : windows) {
            if (!seen[window]) {
                seen[window] = true;
                result[count++] = window;
            }
        }
        return result;
    }
}
