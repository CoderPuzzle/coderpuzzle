class Solution:
    def deleteNodes(self, head: Optional[ListNode], m: int, n: int) -> Optional[ListNode]:
        # A dummy node in front of the head gives every cycle the same
        # starting position: standing on the keep run's last node.
        dummy = ListNode(0, head)
        node = dummy
        while node.next:
            # Keep the next m nodes; a run cut short by the tail simply
            # leaves `node` on the final node of the list.
            for _ in range(m):
                if node.next is None:
                    break
                node = node.next
            # Drop the next n nodes: send skipper ahead up to n steps, then
            # splice whatever survives onto the keep run.
            skipper = node
            for _ in range(n):
                if skipper.next is None:
                    break
                skipper = skipper.next
            node.next = skipper.next
        return dummy.next
