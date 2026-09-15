class Solution {
  public:
    int maximumWidth(vector<int> &planks) {
        // For a fixed fence height h: every height-h plank joins the fence
        // as is, and planks of any other height can only contribute as
        // halves of disjoint pairs summing to h. A height-h plank itself can
        // never be in such a pair (its partner would need height 0), so
        // singles and pairs never compete for a plank: their counts add.
        unordered_map<int, int> freq;
        for (int plank : planks)
            ++freq[plank];
        vector<pair<int, int>> heights(freq.begin(), freq.end());
        sort(heights.begin(), heights.end());
        // bucket[s] = number of disjoint pairs of planks whose heights sum
        // to s, accumulated once over every unordered pair of height values.
        unordered_map<int, int> bucket;
        for (auto xit = heights.begin(); xit != heights.end(); ++xit) {
            int countX = xit->second;
            if (countX >= 2)
                bucket[2 * xit->first] += countX / 2;
            for (auto yit = next(xit); yit != heights.end(); ++yit) {
                int pairs = min(countX, yit->second);
                bucket[xit->first + yit->first] += pairs;
            }
        }
        // Achievable fence heights are exactly the original heights plus
        // the pairwise sums; a lone plank already builds a width-1 fence.
        int best = 0;
        for (const auto &count : freq)
            best = max(best, count.second);
        for (const auto &entry : bucket) {
            auto found = freq.find(entry.first);
            int total = entry.second + (found == freq.end() ? 0 : found->second);
            best = max(best, total);
        }
        return best;
    }
};
