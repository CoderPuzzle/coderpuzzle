class Solution {

    public boolean isPreorder(int[][] nodes) {
        // Stack of ancestors whose subtrees are still open, held as a plain
        // int array so even 100000-deep chains never touch boxed values.
        int[] stack = new int[nodes.length];
        int top = -1;
        for (int i = 0; i < nodes.length; ++i) {
            int nodeId = nodes[i][0];
            int parentId = nodes[i][1];
            if (i == 0) {
                if (parentId != -1) {
                    return false;
                }
            } else {
                while (top >= 0 && stack[top] != parentId) {
                    top--;
                }
                if (top < 0) {
                    return false;
                }
            }
            stack[++top] = nodeId;
        }
        return true;
    }
}
