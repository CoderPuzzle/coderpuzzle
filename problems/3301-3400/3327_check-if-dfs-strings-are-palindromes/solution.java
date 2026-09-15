import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {

    public boolean[] findAnswer(int[] parent, String s) {
        int n = parent.length;
        List<List<Integer>> children = new ArrayList<>();
        for (int i = 0; i < n; i++) children.add(new ArrayList<>());
        for (int i = 1; i < n; i++) children.get(parent[i]).add(i);

        // Postorder tour of the whole tree: dfs(x) appends every subtree
        // string of x before s[x], so the subtree of node i is exactly the
        // tour segment of length size[i] ending at i's own position. The
        // stack version below visits children in decreasing order, whose
        // reverse is the required postorder (children increasing, node
        // last).
        List<Integer> preList = new ArrayList<>();
        List<Integer> stack = new ArrayList<>();
        stack.add(0);
        while (!stack.isEmpty()) {
            int v = stack.remove(stack.size() - 1);
            preList.add(v);
            for (int c : children.get(v)) stack.add(c);
        }
        Collections.reverse(preList);
        int[] pre = new int[n];
        for (int i = 0; i < n; i++) pre[i] = preList.get(i);

        char[] tour = new char[n];
        int[] pos = new int[n];
        int[] size = new int[n];
        java.util.Arrays.fill(size, 1);
        for (int idx = 0; idx < n; idx++) {
            int v = pre[idx];
            tour[idx] = s.charAt(v);
            pos[v] = idx;
        }
        for (int idx = 0; idx < n; idx++) {
            int v = pre[idx];
            if (parent[v] >= 0) size[parent[v]] += size[v];
        }

        // Manacher's algorithm on the tour: p[i] is the palindrome radius
        // at center i of the '#' interleaving. A substring [l, r] is a
        // palindrome iff the radius at its transformed center l + r + 1
        // covers its full length, so each node costs one comparison.
        int m = 2 * n + 1;
        char[] t = new char[m];
        java.util.Arrays.fill(t, '#');
        for (int i = 0; i < n; i++) t[2 * i + 1] = tour[i];
        int[] p = new int[m];
        int center = 0;
        int right = 0;
        for (int i = 0; i < m; i++) {
            if (i < right) p[i] = Math.min(right - i, p[2 * center - i]);
            while (i - p[i] - 1 >= 0 && i + p[i] + 1 < m && t[i - p[i] - 1] == t[i + p[i] + 1]) {
                p[i]++;
            }
            if (i + p[i] > right) {
                center = i;
                right = i + p[i];
            }
        }

        boolean[] answer = new boolean[n];
        for (int i = 0; i < n; i++) answer[i] = p[2 * pos[i] - size[i] + 2] >= size[i];
        return answer;
    }
}
