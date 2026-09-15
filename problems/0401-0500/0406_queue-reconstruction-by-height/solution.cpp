class Solution {
  public:
    vector<vector<int>> reconstructQueue(vector<vector<int>> &people) {
        vector<vector<int>> ordered = people;
        sort(ordered.begin(), ordered.end(), [](const vector<int> &a, const vector<int> &b) {
            if (a[0] != b[0])
                return a[0] > b[0]; // taller first
            return a[1] < b[1];     // fewer people in front first
        });
        // With everyone already placed taller-or-equal, inserting at index k
        // puts exactly k such people in front; shorter people inserted later
        // are invisible to taller people's counts.
        vector<vector<int>> queue;
        for (auto &person : ordered) {
            queue.insert(queue.begin() + person[1], person);
        }
        return queue;
    }
};
