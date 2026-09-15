class Solution:
    def getIntersectionNode(self, headA, headB):
        # Nodes hash by identity — the class defines no __eq__ — so the set
        # keys on the node itself, never on its value.
        in_a = set()
        node = headA
        while node is not None:
            in_a.add(node)
            node = node.next
        node = headB
        while node is not None:
            if node in in_a:
                return node
            node = node.next
        return None
