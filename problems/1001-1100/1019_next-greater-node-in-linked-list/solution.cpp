class Solution {
  public:
    vector<int> nextLargerNodes(ListNode *head) {
        vector<int> values;
        for (ListNode *node = head; node != nullptr; node = node->next) {
            values.push_back(node->val);
        }
        int n = (int)values.size();
        vector<int> answer(n, 0);
        vector<int> stack; // indices with values in decreasing order
        for (int i = 0; i < n; i++) {
            while (!stack.empty() && values[stack.back()] < values[i]) {
                answer[stack.back()] = values[i];
                stack.pop_back();
            }
            stack.push_back(i);
        }
        return answer;
    }
};
