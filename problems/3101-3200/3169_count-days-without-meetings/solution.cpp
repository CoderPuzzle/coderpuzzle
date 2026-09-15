class Solution {
  public:
    int countDays(int days, vector<vector<int>> &meetings) {
        sort(meetings.begin(), meetings.end());
        long long free = 0;
        long long lastEnd = 0;
        for (auto &meeting : meetings) {
            long long start = meeting[0];
            long long end = meeting[1];
            if (start > lastEnd) {
                free += start - lastEnd - 1;
            }
            if (end > lastEnd) {
                lastEnd = end;
            }
        }
        free += days - lastEnd;
        return (int)free;
    }
};
