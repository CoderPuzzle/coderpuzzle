class Solution {
  public:
    vector<int> nodesBetweenCriticalPoints(ListNode *head) {
        ListNode *previous = head;
        ListNode *current = head->next;
        int index = 1;
        int first = -1;
        int last = -1;
        int minimumGap = INT_MAX;

        while (current->next != nullptr) {
            ListNode *following = current->next;
            if ((current->val > previous->val && current->val > following->val) ||
                (current->val < previous->val && current->val < following->val)) {
                if (first == -1) {
                    first = index;
                } else {
                    minimumGap = min(minimumGap, index - last);
                }
                last = index;
            }
            previous = current;
            current = following;
            ++index;
        }

        if (first == last) {
            return {-1, -1};
        }
        return {minimumGap, last - first};
    }
};
