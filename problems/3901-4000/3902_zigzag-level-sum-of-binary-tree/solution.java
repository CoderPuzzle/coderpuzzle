import java.util.ArrayList;
import java.util.List;

class Solution {

    public long[] zigzagLevelSum(TreeNode root) {
        List<TreeNode> frontier = new ArrayList<>();
        frontier.add(root);
        List<Long> sums = new ArrayList<>();
        boolean odd = true;
        while (!frontier.isEmpty()) {
            long total = 0;
            for (int step = 0; step < frontier.size(); ++step) {
                int index = odd ? step : frontier.size() - 1 - step;
                TreeNode node = frontier.get(index);
                TreeNode required = odd ? node.left : node.right;
                if (required == null) break;
                total += node.val;
            }
            sums.add(total);
            List<TreeNode> next = new ArrayList<>();
            for (TreeNode node : frontier) {
                if (node.left != null) next.add(node.left);
                if (node.right != null) next.add(node.right);
            }
            frontier = next;
            odd = !odd;
        }
        long[] answer = new long[sums.size()];
        for (int i = 0; i < answer.length; ++i) answer[i] = sums.get(i);
        return answer;
    }
}
