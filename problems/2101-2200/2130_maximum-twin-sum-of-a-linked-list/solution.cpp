class Solution {
  public:
    int pairSum(ListNode *head) {
        ListNode *slow = head;
        ListNode *fast = head;
        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
        }

        ListNode *reversedHalf = nullptr;
        while (slow != nullptr) {
            ListNode *following = slow->next;
            slow->next = reversedHalf;
            reversedHalf = slow;
            slow = following;
        }

        int answer = 0;
        ListNode *first = head;
        ListNode *second = reversedHalf;
        while (second != nullptr) {
            answer = max(answer, first->val + second->val);
            first = first->next;
            second = second->next;
        }
        return answer;
    }
};
