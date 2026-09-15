class Solution {
  public:
    long long maximumSum(vector<int> &nums, int m, int l, int r) {
        int n = static_cast<int>(nums.size());
        vector<long long> prefix(n + 1, 0);
        for (int i = 0; i < n; ++i)
            prefix[i + 1] = prefix[i] + nums[i];

        vector<long long> values(n + 1);
        vector<int> counts(n + 1);
        vector<int> queue(n + 1);
        auto evaluate = [&](long long penalty) -> pair<long long, int> {
            int head = 0, tail = 0;
            values[0] = 0;
            counts[0] = 0;
            for (int end = 1; end <= n; ++end) {
                int start = end - l;
                if (start >= 0) {
                    long long key = values[start] - prefix[start];
                    while (tail > head) {
                        int back = queue[tail - 1];
                        long long backKey = values[back] - prefix[back];
                        if (backKey > key || (backKey == key && counts[back] > counts[start]))
                            break;
                        --tail;
                    }
                    queue[tail++] = start;
                }
                while (head < tail && queue[head] < end - r)
                    ++head;

                values[end] = values[end - 1];
                counts[end] = counts[end - 1];
                if (head < tail) {
                    start = queue[head];
                    long long takeValue = prefix[end] - penalty + values[start] - prefix[start];
                    int takeCount = counts[start] + 1;
                    if (takeValue > values[end] || (takeValue == values[end] && takeCount > counts[end])) {
                        values[end] = takeValue;
                        counts[end] = takeCount;
                    }
                }
            }
            return {values[n], counts[n]};
        };

        auto [value, count] = evaluate(0);
        if (count == 0) {
            int head = 0, tail = 0;
            long long best = numeric_limits<long long>::min();
            for (int end = 1; end <= n; ++end) {
                int start = end - l;
                if (start >= 0) {
                    while (tail > head && prefix[queue[tail - 1]] >= prefix[start])
                        --tail;
                    queue[tail++] = start;
                }
                while (head < tail && queue[head] < end - r)
                    ++head;
                if (head < tail)
                    best = max(best, prefix[end] - prefix[queue[head]]);
            }
            return best;
        }
        if (count <= m)
            return value;

        long long maxAbs = 0;
        for (int number : nums)
            maxAbs = max(maxAbs, llabs(static_cast<long long>(number)));
        long long lowPenalty = 0, highPenalty = maxAbs * n + 1;
        while (lowPenalty < highPenalty) {
            long long penalty = (lowPenalty + highPenalty + 1) / 2;
            if (evaluate(penalty).second >= m)
                lowPenalty = penalty;
            else
                highPenalty = penalty - 1;
        }
        return evaluate(lowPenalty).first + lowPenalty * m;
    }
};
