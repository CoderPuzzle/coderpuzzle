class Solution {
  public:
    ListNode *reverseEvenLengthGroups(ListNode *head) {
        ListNode dummy(0);
        dummy.next = head;
        ListNode *before = &dummy;
        int targetLength = 1;

        while (before->next != nullptr) {
            ListNode *groupEnd = before;
            int actualLength = 0;
            while (actualLength < targetLength && groupEnd->next != nullptr) {
                groupEnd = groupEnd->next;
                ++actualLength;
            }

            if (actualLength % 2 == 0) {
                ListNode *groupStart = before->next;
                ListNode *current = groupStart;
                ListNode *previous = groupEnd->next;
                for (int i = 0; i < actualLength; ++i) {
                    ListNode *following = current->next;
                    current->next = previous;
                    previous = current;
                    current = following;
                }
                before->next = previous;
                before = groupStart;
            } else {
                before = groupEnd;
            }
            ++targetLength;
        }

        return dummy.next;
    }
};
