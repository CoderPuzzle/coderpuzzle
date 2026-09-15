class Solution {
  public:
    int maxTwoEvents(vector<vector<int>> &events) {
        sort(events.begin(), events.end(),
             [](const vector<int> &left, const vector<int> &right) { return left[0] < right[0]; });
        vector<int> suffixMaximum(events.size() + 1);
        for (int index = static_cast<int>(events.size()) - 1; index >= 0; --index) {
            suffixMaximum[index] = max(events[index][2], suffixMaximum[index + 1]);
        }

        int answer = 0;
        for (const vector<int> &event : events) {
            int low = 0;
            int high = static_cast<int>(events.size());
            while (low < high) {
                int middle = low + (high - low) / 2;
                if (events[middle][0] <= event[1]) {
                    low = middle + 1;
                } else {
                    high = middle;
                }
            }
            answer = max(answer, event[2] + suffixMaximum[low]);
        }

        return answer;
    }
};
