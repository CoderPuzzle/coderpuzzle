import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public List<TreeNode> findDuplicateSubtrees(TreeNode root) {
        Map<String, Object[]> info = new HashMap<>(); // serial -> [first node, last index, count]
        int[] counter = new int[1];
        key(root, info, counter);
        List<Object[]> entries = new ArrayList<>(info.values());
        entries.sort((a, b) -> Integer.compare((Integer) a[1], (Integer) b[1]));
        List<TreeNode> duplicates = new ArrayList<>();
        for (Object[] entry : entries) {
            if ((Integer) entry[2] >= 2) {
                duplicates.add((TreeNode) entry[0]);
            }
        }
        return duplicates;
    }

    private String key(TreeNode node, Map<String, Object[]> info, int[] counter) {
        if (node == null) {
            return "#";
        }
        int index = counter[0]++;
        String serial = node.val + "," + key(node.left, info, counter) + "," + key(node.right, info, counter);
        Object[] entry = info.get(serial);
        if (entry != null) {
            entry[1] = index;
            entry[2] = (Integer) entry[2] + 1;
        } else {
            info.put(serial, new Object[] { node, index, 1 });
        }
        return serial;
    }
}
