import java.util.Arrays;

class Solution {

    public String getKthCharacter(String[] root, int k) {
        // Decode the level order: an entry of digits is an internal node,
        // an entry of letters is a leaf, and "" marks an absent child.
        // Only internal nodes occupy child slots, so only they join the
        // queue.
        int n = root.length;
        boolean[] internal = new boolean[n];
        String[] word = new String[n];
        int[] left = new int[n];
        int[] right = new int[n];
        Arrays.fill(left, -1);
        Arrays.fill(right, -1);
        for (int i = 0; i < n; i++) {
            char c = root[i].isEmpty() ? ' ' : root[i].charAt(0);
            internal[i] = c >= '0' && c <= '9';
            word[i] = internal[i] ? "" : root[i];
        }
        int[] queue = new int[n];
        int tail = 0;
        queue[tail++] = 0;
        for (int head = 0, i = 1; head < tail; head++) {
            int nd = queue[head];
            for (int slot = 0; slot < 2; slot++) {
                if (i >= n) {
                    break;
                }
                int child = i++;
                if (root[child].isEmpty()) {
                    continue;
                }
                if (slot == 0) {
                    left[nd] = child;
                } else {
                    right[nd] = child;
                }
                if (internal[child]) {
                    queue[tail++] = child;
                }
            }
        }
        // total[i] = length of S[i], computed bottom-up with an explicit
        // stack: a leaf contributes word length, an internal node the sum
        // of its children's totals.
        int[] total = new int[n];
        int[] stack = new int[2 * n];
        boolean[] ready = new boolean[2 * n];
        int top = 0;
        stack[top] = 0;
        ready[top] = false;
        top++;
        while (top > 0) {
            top--;
            int nd = stack[top];
            if (!internal[nd]) {
                total[nd] = word[nd].length();
            } else if (ready[top]) {
                total[nd] = (left[nd] >= 0 ? total[left[nd]] : 0) + (right[nd] >= 0 ? total[right[nd]] : 0);
            } else {
                ready[top] = true;
                top++;
                if (right[nd] >= 0) {
                    stack[top] = right[nd];
                    ready[top] = false;
                    top++;
                }
                if (left[nd] >= 0) {
                    stack[top] = left[nd];
                    ready[top] = false;
                    top++;
                }
            }
        }
        // Descend without ever building a string: the left subtree owns
        // the first total[left] characters, so k either falls inside it
        // or shifts past it into the right subtree.
        int nd = 0;
        while (internal[nd]) {
            int leftLen = left[nd] >= 0 ? total[left[nd]] : 0;
            if (k <= leftLen) {
                nd = left[nd];
            } else {
                k -= leftLen;
                nd = right[nd];
            }
        }
        return word[nd].substring(k - 1, k);
    }
}
