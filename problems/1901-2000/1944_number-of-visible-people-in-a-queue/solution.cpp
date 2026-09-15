class Solution {
  public:
    vector<int> canSeePersonsCount(vector<int> &heights) {
        int n = heights.size();
        vector<int> answer(n);
        // Scan right-to-left; the stack holds exactly the people visible to
        // a shorter person arriving from the left (heights increasing top-down).
        vector<int> stack;
        for (int i = n - 1; i >= 0; i--) {
            int seen = 0;
            // Each popped person is shorter and has only shorter people
            // between themselves and i, so i sees them. Strict < suffices
            // because all heights are distinct.
            while (!stack.empty() && stack.back() < heights[i]) {
                stack.pop_back();
                seen++;
            }
            // If anything remains, its top is the first person right of i
            // taller than i: visible across the popped people, and it blocks
            // everyone beyond it. Popped entries stay discarded -- i shadows
            // them for anyone further left.
            answer[i] = seen + (stack.empty() ? 0 : 1);
            stack.push_back(heights[i]);
        }
        // Each index is pushed and popped at most once: linear in total.
        return answer;
    }
};
