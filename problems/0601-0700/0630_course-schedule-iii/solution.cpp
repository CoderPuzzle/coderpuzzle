class Solution {
  public:
    int scheduleCourse(vector<vector<int>> &courses) {
        sort(courses.begin(), courses.end(), [](const vector<int> &a, const vector<int> &b) { return a[1] < b[1]; });
        priority_queue<int> heap; // max-heap of taken durations
        long long total = 0;
        for (const auto &course : courses) {
            int duration = course[0];
            int lastDay = course[1];
            if (total + duration <= lastDay) {
                total += duration;
                heap.push(duration);
            } else if (!heap.empty() && heap.top() > duration) {
                total += duration - heap.top();
                heap.pop();
                heap.push(duration);
            }
        }
        return heap.size();
    }
};
