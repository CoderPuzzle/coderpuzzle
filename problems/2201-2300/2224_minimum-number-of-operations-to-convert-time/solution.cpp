class Solution {
  public:
    int convertTime(string current, string correct) {
        auto to_minutes = [](const string &time) {
            return (time[0] - '0') * 600 + (time[1] - '0') * 60 + (time[3] - '0') * 10 + (time[4] - '0');
        };
        int diff = to_minutes(correct) - to_minutes(current);
        int operations = 0;
        for (int step : {60, 15, 5, 1}) {
            operations += diff / step;
            diff %= step;
        }
        return operations;
    }
};
