class Solution {
  public:
    int minimumBoxes(vector<int> &apple, vector<int> &capacity) {
        // Packs split freely across boxes, so only the apple total
        // matters, not its division into packs. Filling the largest
        // boxes first makes each selected box cover as much of the
        // total as possible, so the prefix of the descending-sorted
        // capacities is optimal.
        int total = 0;
        for (int pack : apple) {
            total += pack;
        }
        sort(capacity.rbegin(), capacity.rend());
        int filled = 0;
        for (int i = 0; i < (int)capacity.size(); ++i) {
            filled += capacity[i];
            if (filled >= total) {
                return i + 1;
            }
        }
        // The input guarantees a full redistribution is possible.
        return (int)capacity.size();
    }
};
