class Solution:
    def getIntersectionNode(self, headA, headB):
        length_a = length_b = 0
        node = headA
        while node is not None:
            length_a += 1
            node = node.next
        node = headB
        while node is not None:
            length_b += 1
            node = node.next
        first, second = headA, headB
        while length_a > length_b:
            first = first.next
            length_a -= 1
        while length_b > length_a:
            second = second.next
            length_b -= 1
        while first is not second:
            first = first.next
            second = second.next
        return first
