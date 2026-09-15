#include <limits>
#include <vector>

using namespace std;

class Solution {
    struct Line {
        long long slope, intercept, start;
        int count;
    };

  public:
    long long minPartitionScore(vector<int> &nums, int k) {
        vector<long long> prefix;
        long long total = 0;
        for (int value : nums) {
            total += value;
            prefix.push_back(total);
        }
        long long low = 0, high = total * total;
        while (low < high) {
            long long middle = low + (high - low + 1) / 2;
            if (run(prefix, middle).second >= k)
                low = middle;
            else
                high = middle - 1;
        }
        long long relaxed = run(prefix, low).first;
        return (relaxed - low * k + total) / 2;
    }

  private:
    pair<long long, int> run(const vector<long long> &prefix, long long penalty) {
        vector<Line> hull{{0, 0, numeric_limits<long long>::min(), 0}};
        int head = 0;
        long long cost = 0;
        int count = 0;
        for (long long x : prefix) {
            while (head + 1 < static_cast<int>(hull.size()) && hull[head + 1].start <= x)
                ++head;
            const Line &best = hull[head];
            cost = x * x + penalty + best.slope * x + best.intercept;
            count = best.count + 1;
            Line line{-2 * x, cost + x * x, numeric_limits<long long>::min(), count};
            while (!hull.empty()) {
                const Line &old = hull.back();
                long long difference = line.intercept - old.intercept;
                long long denominator = old.slope - line.slope;
                line.start =
                    count > old.count ? ceilDiv(difference, denominator) : floorDiv(difference, denominator) + 1;
                if (line.start > old.start)
                    break;
                hull.pop_back();
                head = min(head, static_cast<int>(hull.size()) - 1);
            }
            if (hull.empty()) {
                line.start = numeric_limits<long long>::min();
                head = 0;
            }
            hull.push_back(line);
        }
        return {cost, count};
    }

    long long floorDiv(long long value, long long divisor) {
        long long quotient = value / divisor;
        if (value < 0 && value % divisor != 0)
            --quotient;
        return quotient;
    }

    long long ceilDiv(long long value, long long divisor) {
        long long quotient = value / divisor;
        if (value > 0 && value % divisor != 0)
            ++quotient;
        return quotient;
    }
};
