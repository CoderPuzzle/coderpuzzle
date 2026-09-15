class Solution {

    public int[] loudAndRich(int[][] richer, int[] quiet) {
        // Each pair [a, b] is an edge from a richer person to a poorer one,
        // so the people definitely at least as rich as x are x plus all its
        // ancestors in the DAG. A memoized DFS settles persons from the
        // known-poorest upward: once every direct richer neighbor of x has
        // settled, answer[x] folds in their answers, each of which already
        // covers that neighbor's whole chain.
        int n = quiet.length;
        int[] degree = new int[n];
        for (int[] pair : richer) {
            ++degree[pair[1]];
        }
        int[][] richerOf = new int[n][];
        for (int x = 0; x < n; ++x) {
            richerOf[x] = new int[degree[x]];
            degree[x] = 0;
        }
        for (int[] pair : richer) {
            richerOf[pair[1]][degree[pair[1]]++] = pair[0];
        }
        int[] answer = new int[n];
        for (int x = 0; x < n; ++x) {
            answer[x] = x;
        }
        boolean[] settled = new boolean[n];
        int[] nodeStack = new int[n];
        int[] nextIndex = new int[n];
        for (int start = 0; start < n; ++start) {
            if (settled[start]) {
                continue;
            }
            int top = 1;
            nodeStack[0] = start;
            nextIndex[0] = 0;
            while (top > 0) {
                int x = nodeStack[top - 1];
                int i = nextIndex[top - 1];
                if (i < richerOf[x].length) {
                    nextIndex[top - 1] = i + 1;
                    int a = richerOf[x][i];
                    if (!settled[a]) {
                        nodeStack[top] = a;
                        nextIndex[top] = 0;
                        ++top;
                    }
                } else {
                    --top;
                    for (int a : richerOf[x]) {
                        if (quiet[answer[a]] < quiet[answer[x]]) {
                            answer[x] = answer[a];
                        }
                    }
                    settled[x] = true;
                }
            }
        }
        return answer;
    }
}
