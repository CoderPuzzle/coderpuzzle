class Solution {
  public:
    vector<int> nextGreaterElement(vector<int> &nums1, vector<int> &nums2) {
        // One scan of nums2 answers every query: the stack holds values
        // still waiting for their next greater element.
        unordered_map<int, int> nextGreater;
        vector<int> stack;
        for (int value : nums2) {
            // The current value is the FIRST greater value to the right of
            // each popped element (anything closer would have popped them
            // already); each element is pushed once, popped at most once.
            while (!stack.empty() && stack.back() < value) {
                nextGreater[stack.back()] = value;
                stack.pop_back();
            }
            stack.push_back(value);
        }
        // Whatever survives on the stack has nothing greater to its right.
        for (int value : stack) {
            nextGreater[value] = -1;
        }
        // Values are unique and nums1 is a subset of nums2, so every
        // lookup hits.
        vector<int> result;
        result.reserve(nums1.size());
        for (int value : nums1) {
            result.push_back(nextGreater[value]);
        }
        return result;
    }
};
