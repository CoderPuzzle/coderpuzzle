class Solution {

    public NodeWithNext connect(NodeWithNext root) {
        if (root == null) return null;
        NodeWithNext level = root;
        while (level.left != null) {
            NodeWithNext head = level;
            while (head != null) {
                head.left.next = head.right;
                if (head.next != null) head.right.next = head.next.left;
                head = head.next;
            }
            level = level.left;
        }
        return root;
    }
}
