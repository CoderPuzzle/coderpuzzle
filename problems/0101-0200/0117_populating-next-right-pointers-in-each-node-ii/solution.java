class Solution {

    public NodeWithNext connect(NodeWithNext root) {
        NodeWithNext level = root;
        while (level != null) {
            NodeWithNext head = null;
            NodeWithNext tail = null;
            for (NodeWithNext node = level; node != null; node = node.next) {
                if (node.left != null) {
                    if (head == null) head = node.left;
                    else tail.next = node.left;
                    tail = node.left;
                }
                if (node.right != null) {
                    if (head == null) head = node.right;
                    else tail.next = node.right;
                    tail = node.right;
                }
            }
            level = head;
        }
        return root;
    }
}
