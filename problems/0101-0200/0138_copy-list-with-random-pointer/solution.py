class Solution:
    def copyRandomList(self, head):
        if head is None:
            return None
        copies = {}
        node = head
        while node is not None:
            copies[node] = RandomListNode(node.val)
            node = node.next
        node = head
        while node is not None:
            if node.next is not None:
                copies[node].next = copies[node.next]
            if node.random is not None:
                copies[node].random = copies[node.random]
            node = node.next
        return copies[head]
