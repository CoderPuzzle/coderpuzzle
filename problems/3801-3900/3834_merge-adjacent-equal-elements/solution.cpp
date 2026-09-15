class Solution {
  public:
    vector<long long> mergeAdjacent(vector<int> &nums) {
        // Scan left to right keeping a stack of settled elements; when the incoming
        // value equals the top, merge them into their sum and keep cascading left
        // while the new sum equals the new top — the final stack is the answer.
        vector<long long> stack;
        for (int value : nums) {
            if (!stack.empty() && stack.back() == value) {
                long long merged = stack.back() + value;
                stack.pop_back();
                while (!stack.empty() && stack.back() == merged) {
                    merged += stack.back();
                    stack.pop_back();
                }
                stack.push_back(merged);
            } else {
                stack.push_back(value);
            }
        }
        return stack;
    }
};
