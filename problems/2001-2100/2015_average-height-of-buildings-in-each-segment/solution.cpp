class Solution {
  public:
    vector<vector<int>> averageHeightOfBuildings(vector<vector<int>> &buildings) {
        map<int, pair<long long, long long>> events;
        for (const auto &building : buildings) {
            events[building[0]].first += building[2];
            events[building[0]].second += 1;
            events[building[1]].first -= building[2];
            events[building[1]].second -= 1;
        }

        vector<vector<int>> street;
        long long heightSum = 0;
        long long count = 0;
        for (auto event = events.begin(); next(event) != events.end(); ++event) {
            int left = event->first;
            heightSum += event->second.first;
            count += event->second.second;
            int right = next(event)->first;
            if (count == 0) {
                continue;
            }
            int average = (int)(heightSum / count);
            if (!street.empty() && street.back()[1] == left && street.back()[2] == average) {
                street.back()[1] = right;
            } else {
                street.push_back({left, right, average});
            }
        }
        return street;
    }
};
