class Solution {
  public:
    int minMovesToSeat(vector<int> &seats, vector<int> &students) {
        sort(seats.begin(), seats.end());
        sort(students.begin(), students.end());

        int moves = 0;
        for (size_t i = 0; i < seats.size(); ++i) {
            moves += abs(seats[i] - students[i]);
        }
        return moves;
    }
};
