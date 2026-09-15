import java.util.HashMap;
import java.util.Map;

class Solution {

    public RandomListNode copyRandomList(RandomListNode head) {
        if (head == null) return null;
        Map<RandomListNode, RandomListNode> copies = new HashMap<>();
        for (RandomListNode node = head; node != null; node = node.next) {
            copies.put(node, new RandomListNode(node.val));
        }
        for (RandomListNode node = head; node != null; node = node.next) {
            if (node.next != null) copies.get(node).next = copies.get(node.next);
            if (node.random != null) copies.get(node).random = copies.get(node.random);
        }
        return copies.get(head);
    }
}
