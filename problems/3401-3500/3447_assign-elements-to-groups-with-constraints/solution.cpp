class Solution {
  public:
    // Sieve from the smallest element index: the first occurrence of each
    // value claims every multiple it divides, so each group size reads off
    // the earliest qualifying element index.
    vector<int> assignElements(vector<int> &groups, vector<int> &elements) {
        const int limit = 100001;
        vector<int> best(limit, -1);
        vector<char> seen(limit, 0);
        for (int index = 0; index < (int)elements.size(); index++) {
            int value = elements[index];
            if (seen[value]) {
                continue;
            }
            seen[value] = 1;
            for (int multiple = value; multiple < limit; multiple += value) {
                if (best[multiple] == -1) {
                    best[multiple] = index;
                }
            }
        }
        vector<int> assigned;
        assigned.reserve(groups.size());
        for (int size : groups) {
            assigned.push_back(best[size]);
        }
        return assigned;
    }
};
