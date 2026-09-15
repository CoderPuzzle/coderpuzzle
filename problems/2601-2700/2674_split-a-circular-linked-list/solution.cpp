class Solution {
  public:
    vector<ListNode *> splitCircularLinkedList(ListNode *list) {
        int count = 1;
        ListNode *tail = list;
        while (tail->next != list) {
            tail = tail->next;
            count++;
        }
        int half = (count + 1) / 2;
        ListNode *first_tail = list;
        for (int i = 0; i < half - 1; i++)
            first_tail = first_tail->next;
        ListNode *second_head = first_tail->next;
        ListNode *second_tail = second_head;
        while (second_tail->next != list)
            second_tail = second_tail->next;
        first_tail->next = list;
        second_tail->next = second_head;
        return {list, second_head};
    }
};
