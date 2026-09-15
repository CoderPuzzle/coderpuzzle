import java.util.HashSet;
import java.util.Set;

class Solution {

    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        // ListNode overrides neither equals nor hashCode, so the set keys
        // nodes by identity, never by value.
        Set<ListNode> inA = new HashSet<>();
        for (ListNode node = headA; node != null; node = node.next) inA.add(node);
        for (ListNode node = headB; node != null; node = node.next) {
            if (inA.contains(node)) return node;
        }
        return null;
    }
}
