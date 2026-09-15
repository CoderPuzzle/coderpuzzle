class Solution {
  public:
    vector<long long> countSteppingNumbers(long long low, long long high) {
        // Seed with every one-digit number, then extend by one digit: the
        // successor of a number ending in d is built from d-1 and d+1 only.
        vector<long long> out;
        if (low <= 0 && 0 <= high)
            out.push_back(0);
        deque<long long> queue;
        for (long long seed = 1; seed <= 9; ++seed)
            queue.push_back(seed);
        while (!queue.empty()) {
            long long current = queue.front();
            queue.pop_front();
            if (current > high)
                continue;
            if (current >= low)
                out.push_back(current);
            long long last = current % 10;
            for (long long digit : {last - 1, last + 1}) {
                if (digit >= 0 && digit <= 9)
                    queue.push_back(current * 10 + digit);
            }
        }
        return out;
    }
};
