class Solution {
  public:
    bool haveConflict(vector<string> &event1, vector<string> &event2) {
        // Each "HH:MM" is one minute-of-day integer, so each event is an
        // inclusive integer interval. Two inclusive intervals intersect
        // exactly when neither starts after the other ends.
        auto toMinutes = [](const string &time) { return stoi(time.substr(0, 2)) * 60 + stoi(time.substr(3)); };
        int start1 = toMinutes(event1[0]);
        int end1 = toMinutes(event1[1]);
        int start2 = toMinutes(event2[0]);
        int end2 = toMinutes(event2[1]);
        return start1 <= end2 && start2 <= end1;
    }
};
