class Solution {
  public:
    int minGroupsForValidAssignment(vector<int> &balls) {
        // Some box size s must make every box hold s or s + 1 balls, and the
        // value with the fewest copies bounds s by its frequency. For each
        // candidate s, pack each frequency f into f / (s + 1) boxes when it
        // divides evenly, one more box when the remainder can be absorbed by
        // shrinking that many full boxes, or fail; the cheapest feasible s
        // wins.
        unordered_map<int, int> counts;
        for (int ball : balls) {
            ++counts[ball];
        }
        vector<int> freqs;
        freqs.reserve(counts.size());
        int smallest = (int)balls.size();
        for (auto &[_, f] : counts) {
            freqs.push_back(f);
            smallest = min(smallest, f);
        }
        int best = (int)balls.size();
        for (int size = 1; size <= smallest; ++size) {
            int total = 0;
            bool ok = true;
            for (int f : freqs) {
                int big = f / (size + 1);
                int rest = f % (size + 1);
                if (rest != 0) {
                    if (size - rest > big) {
                        ok = false;
                        break;
                    }
                    ++total;
                }
                total += big;
            }
            if (ok && total < best) {
                best = total;
            }
        }
        return best;
    }
};
