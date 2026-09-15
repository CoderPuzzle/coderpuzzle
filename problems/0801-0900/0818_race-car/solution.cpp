class Solution {
  public:
    int racecar(int target) {
        long long bound = 2LL * target;
        long long span = 4 * bound + 1;
        // Encode (pos, speed) as an integer key: speed lives in [-2*bound, 2*bound].
        auto encode = [&](long long pos, long long speed) { return (pos + bound) * span + (speed + 2 * bound); };
        vector<pair<long long, long long>> queue;
        queue.push_back({0, 1});
        unordered_set<long long> visited;
        visited.insert(encode(0, 1));
        size_t head = 0;
        int steps = 0;
        while (head < queue.size()) {
            size_t levelEnd = queue.size();
            while (head < levelEnd) {
                auto [pos, speed] = queue[head++];
                if (pos == target)
                    return steps;
                // Accelerate.
                long long np = pos + speed, ns = speed * 2;
                if (-bound <= np && np <= bound && visited.insert(encode(np, ns)).second) {
                    queue.push_back({np, ns});
                }
                // Reverse.
                long long rs = speed > 0 ? -1 : 1;
                if (visited.insert(encode(pos, rs)).second) {
                    queue.push_back({pos, rs});
                }
            }
            steps += 1;
        }
        return -1;
    }
};
