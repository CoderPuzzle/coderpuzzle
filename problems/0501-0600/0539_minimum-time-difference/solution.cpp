class Solution {
  public:
    int findMinDifference(vector<string> &timePoints) {
        // Only 24*60 distinct minute marks exist, so convert each "HH:MM"
        // once and sort: the closest pair must be adjacent in sorted order.
        vector<int> minutes;
        minutes.reserve(timePoints.size());
        for (const string &time : timePoints) {
            minutes.push_back(stoi(time.substr(0, 2)) * 60 + stoi(time.substr(3)));
        }
        sort(minutes.begin(), minutes.end());
        // The clock wraps, so the first and last marks are also a pair —
        // the one that spans midnight; its gap is first + 1440 - last.
        int best = minutes.front() + 24 * 60 - minutes.back();
        for (size_t index = 1; index < minutes.size(); ++index) {
            best = min(best, minutes[index] - minutes[index - 1]);
        }
        return best;
    }
};
