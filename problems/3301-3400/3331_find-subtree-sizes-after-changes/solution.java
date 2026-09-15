import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] findSubtreeSizes(int[] parent, String s) {
        int n = parent.length;
        List<List<Integer>> children = new ArrayList<>();
        for (int i = 0; i < n; i++) children.add(new ArrayList<>());
        for (int i = 1; i < n; i++) children.get(parent[i]).add(i);

        // Iterative DFS from the root. last[c] is the closest ancestor of
        // the current node holding character c; entering v saves it on the
        // stack (paired with v) and the exit visit restores it, so last[]
        // always describes the current root-to-v path. The changes are
        // simultaneous and every rewiring points at an original ancestor,
        // so resolving each node against the original tree is exact.
        int[] last = new int[26];
        java.util.Arrays.fill(last, -1);
        int[] newparent = new int[n];
        java.util.Arrays.fill(newparent, -1);
        List<Integer> pre = new ArrayList<>();
        final int enter = -2;
        List<int[]> stack = new ArrayList<>();
        stack.add(new int[] { 0, enter });
        while (!stack.isEmpty()) {
            int[] top = stack.remove(stack.size() - 1);
            int v = top[0];
            int saved = top[1];
            int c = s.charAt(v) - 'a';
            if (saved == enter) {
                pre.add(v);
                newparent[v] = last[c] != -1 ? last[c] : parent[v];
                stack.add(new int[] { v, last[c] });
                last[c] = v;
                for (int ch : children.get(v)) stack.add(new int[] { ch, enter });
            } else {
                last[c] = saved;
            }
        }

        // Each new parent precedes v in preorder, so consuming preorder in
        // reverse folds subtree sizes up the final tree in one pass.
        int[] size = new int[n];
        java.util.Arrays.fill(size, 1);
        for (int i = n - 1; i >= 1; i--) {
            int v = pre.get(i);
            int p = newparent[v];
            if (p >= 0) size[p] += size[v];
        }
        return size;
    }
}
