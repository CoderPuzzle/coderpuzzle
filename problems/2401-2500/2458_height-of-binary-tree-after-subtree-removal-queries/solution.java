import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int[] treeQueries(TreeNode root, int[] queries) {
        if (root == null) {
            return new int[queries.length]; // all zeros
        }

        Map<Integer, Integer> depth = new HashMap<>();
        Map<Integer, Integer> height = new HashMap<>();
        Map<Integer, Integer> submax = new HashMap<>();

        // iterative pre-order for depth + post-order for height/submax
        List<TreeNode> order = new ArrayList<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        depth.put(root.val, 0);
        while (!stack.isEmpty()) {
            TreeNode u = stack.pop();
            order.add(u);
            if (u.left != null) {
                depth.put(u.left.val, depth.get(u.val) + 1);
                stack.push(u.left);
            }
            if (u.right != null) {
                depth.put(u.right.val, depth.get(u.val) + 1);
                stack.push(u.right);
            }
        }

        for (int k = order.size() - 1; k >= 0; k--) {
            TreeNode u = order.get(k);
            int h = 0;
            if (u.left != null) {
                h = Math.max(h, 1 + height.get(u.left.val));
            }
            if (u.right != null) {
                h = Math.max(h, 1 + height.get(u.right.val));
            }
            height.put(u.val, h);
            int sm = depth.get(u.val) + h;
            if (u.left != null) {
                sm = Math.max(sm, submax.get(u.left.val));
            }
            if (u.right != null) {
                sm = Math.max(sm, submax.get(u.right.val));
            }
            submax.put(u.val, sm);
        }

        Map<Integer, Integer> ans = new HashMap<>();
        Deque<Object[]> st = new ArrayDeque<>();
        st.push(new Object[] { root, -1 });
        while (!st.isEmpty()) {
            Object[] top = st.pop();
            TreeNode u = (TreeNode) top[0];
            int mx = (Integer) top[1];
            ans.put(u.val, mx);
            TreeNode left = u.left;
            TreeNode right = u.right;
            int dv = depth.get(u.val);
            if (left != null) {
                int hWithoutLeft = right != null ? 1 + height.get(right.val) : 0;
                int newMx = mx;
                if (dv + hWithoutLeft > newMx) {
                    newMx = dv + hWithoutLeft;
                }
                if (right != null && submax.get(right.val) > newMx) {
                    newMx = submax.get(right.val);
                }
                st.push(new Object[] { left, newMx });
            }
            if (right != null) {
                int hWithoutRight = left != null ? 1 + height.get(left.val) : 0;
                int newMx = mx;
                if (dv + hWithoutRight > newMx) {
                    newMx = dv + hWithoutRight;
                }
                if (left != null && submax.get(left.val) > newMx) {
                    newMx = submax.get(left.val);
                }
                st.push(new Object[] { right, newMx });
            }
        }

        int[] res = new int[queries.length];
        for (int i = 0; i < queries.length; i++) {
            res[i] = ans.get(queries[i]);
        }
        return res;
    }
}
