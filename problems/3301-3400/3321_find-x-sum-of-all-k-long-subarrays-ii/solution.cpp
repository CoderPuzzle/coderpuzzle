class Solution {
  public:
    vector<long long> findXSum(vector<int> &nums, int k, int x) {
        // TOP is a min-heap and REST a max-heap of (count, value)
        // snapshots of the live distinct values: TOP's top is the worst
        // kept pair, REST's top the best dropped one. Each slide moves at
        // most two pairs between the heaps, and `total` follows every
        // membership change, so one O(n log n) pass answers every window;
        // stale snapshots are skipped on peek and popped when surfaced.
        // A pair packs into one long long as count * 2e9 + value, whose
        // numeric order is exactly (count, value) order.
        const long long PACK = 2'000'000'001LL;
        auto pack = [&](long long count, long long value) { return count * PACK + value; };
        auto cnt = [&](long long key) { return key / PACK; };
        auto val = [&](long long key) { return key % PACK; };
        const int TOP = 0;
        const int REST = 1;
        unordered_map<int, int> freq;
        priority_queue<long long, vector<long long>, greater<long long>> topHeap;
        priority_queue<long long> restHeap;
        unordered_map<long long, int> membership;
        int topSize = 0;
        long long total = 0;
        vector<long long> answer;
        answer.reserve(nums.size() - k + 1);

        auto peekTop = [&]() -> long long {
            while (!topHeap.empty()) {
                long long key = topHeap.top();
                auto role = membership.find(key);
                if (role != membership.end() && role->second == TOP && freq[val(key)] == cnt(key)) {
                    return key;
                }
                topHeap.pop();
            }
            return -1;
        };
        auto peekRest = [&]() -> long long {
            while (!restHeap.empty()) {
                long long key = restHeap.top();
                auto role = membership.find(key);
                if (role != membership.end() && role->second == REST && freq[val(key)] == cnt(key)) {
                    return key;
                }
                restHeap.pop();
            }
            return -1;
        };
        auto erase = [&](long long erasedCount, long long erasedValue) {
            auto it = membership.find(pack(erasedCount, erasedValue));
            if (it == membership.end())
                return;
            int role = it->second;
            membership.erase(it);
            if (role != TOP)
                return;
            topSize--;
            total -= erasedCount * erasedValue;
            while (topSize < x) {
                long long best = peekRest();
                if (best < 0)
                    break;
                restHeap.pop();
                membership[best] = TOP;
                topHeap.push(best);
                topSize++;
                total += cnt(best) * val(best);
            }
        };
        auto place = [&](long long placedCount, long long placedValue) {
            long long key = pack(placedCount, placedValue);
            if (topSize < x) {
                membership[key] = TOP;
                topHeap.push(key);
                topSize++;
                total += placedCount * placedValue;
                return;
            }
            long long worst = peekTop();
            if (key > worst) {
                // the newcomer beats the worst kept pair: swap them
                membership[worst] = REST;
                restHeap.push(worst);
                total -= cnt(worst) * val(worst);
                topSize--;
                membership[key] = TOP;
                topHeap.push(key);
                topSize++;
                total += placedCount * placedValue;
            } else {
                membership[key] = REST;
                restHeap.push(key);
            }
        };

        for (int i = 0; i < (int)nums.size(); ++i) {
            long long value = nums[i];
            long long count = freq[value]++;
            if (count > 0)
                erase(count, value);
            place(count + 1, value);
            if (i >= k) {
                long long leaving = nums[i - k];
                long long old = freq[leaving]--;
                erase(old, leaving);
                old -= 1;
                freq[leaving] = old;
                if (old > 0) {
                    // a count that just reached 0 leaves no pair behind
                    place(old, leaving);
                }
            }
            if (i >= k - 1)
                answer.push_back(total);
        }
        return answer;
    }
};
