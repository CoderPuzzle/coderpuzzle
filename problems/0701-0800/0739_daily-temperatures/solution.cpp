class Solution {
  public:
    vector<int> dailyTemperatures(vector<int> &temperatures) {
        int n = (int)temperatures.size();
        vector<int> answer(n, 0);
        // Stack of days still waiting for a warmer one; their temperatures
        // are non-increasing bottom to top. Unanswered days keep answer 0.
        vector<int> stack;
        stack.reserve(n);
        for (int day = 0; day < n; day++) {
            int temp = temperatures[day];
            // Strictly warmer today resolves each waiting day on top; equal
            // temperatures leave them waiting (strict < comparison).
            while (!stack.empty() && temperatures[stack.back()] < temp) {
                int previous = stack.back();
                stack.pop_back();
                answer[previous] = day - previous;
            }
            stack.push_back(day);
        }
        return answer;
    }
};
