class Solution:
    def splitCircularLinkedList(self, list):
        count = 1
        tail = list
        while tail.next is not list:
            tail = tail.next
            count += 1
        half = (count + 1) // 2
        first_tail = list
        for _ in range(half - 1):
            first_tail = first_tail.next
        second_head = first_tail.next
        second_tail = second_head
        while second_tail.next is not list:
            second_tail = second_tail.next
        first_tail.next = list
        second_tail.next = second_head
        return [list, second_head]
