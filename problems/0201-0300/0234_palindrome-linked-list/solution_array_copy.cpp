class Solution {
  public:
    bool isPalindrome(ListNode *head) {
        // Copy the values into an array; the list itself only needs one
        // forward walk.
        vector<int> values;
        for (ListNode *node = head; node != nullptr; node = node->next) {
            values.push_back(node->val);
        }
        // Two-ended compare: i walks forward, j backward, and every mirror
        // pair must agree before the indices meet in the middle.
        int i = 0;
        int j = (int)values.size() - 1;
        while (i < j) {
            if (values[i] != values[j]) {
                return false;
            }
            i++;
            j--;
        }
        return true;
    }
};
