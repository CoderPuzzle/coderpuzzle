#include <vector>

class Solution {
  public:
    double average(std::vector<long long> &salary) {
        long long total = 0;
        long long low = salary[0];
        long long high = salary[0];
        for (long long value : salary) {
            total += value;
            if (value < low)
                low = value;
            if (value > high)
                high = value;
        }
        return (double)(total - low - high) / (salary.size() - 2);
    }
};
