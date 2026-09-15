class Solution {
  public:
    int numberOfArrays(vector<int> &differences, int lower, int upper) {
        long long prefix = 0;
        long long minimum = 0;
        long long maximum = 0;
        for (int difference : differences) {
            prefix += difference;
            minimum = min(minimum, prefix);
            maximum = max(maximum, prefix);
        }
        long long available = static_cast<long long>(upper) - lower - (maximum - minimum) + 1;
        return static_cast<int>(max(0LL, available));
    }
};
