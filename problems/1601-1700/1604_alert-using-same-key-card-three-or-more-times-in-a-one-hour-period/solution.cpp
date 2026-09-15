class Solution {
  public:
    vector<string> alertNames(vector<string> &keyName, vector<string> &keyTime) {
        // Group each worker's swipe times together; comparisons only ever
        // happen within one worker's own history.
        unordered_map<string, vector<int>> timesByName;
        for (size_t i = 0; i < keyName.size(); i++) {
            int hours = stoi(keyTime[i].substr(0, 2));
            int minutes = stoi(keyTime[i].substr(3, 2));
            // Every swipe falls on a single day, so minutes-since-midnight is
            // all the arithmetic needed — no wraparound to handle.
            timesByName[keyName[i]].push_back(60 * hours + minutes);
        }

        vector<string> alerted;
        for (auto &[name, times] : timesByName) {
            sort(times.begin(), times.end());
            // A window of three consecutive swipes spans at most 60 minutes
            // exactly when the alert condition is met.
            for (size_t i = 0; i + 2 < times.size(); i++) {
                if (times[i + 2] - times[i] <= 60) {
                    alerted.push_back(name);
                    break;
                }
            }
        }

        sort(alerted.begin(), alerted.end());
        return alerted;
    }
};
