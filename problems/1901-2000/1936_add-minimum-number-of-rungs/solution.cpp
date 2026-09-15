class Solution {
  public:
    int addRungs(vector<int> &rungs, int dist) {
        // Greedy: bridge each gap with as few rungs as possible, placing
        // each new rung as high as the current position allows. A gap of g
        // between two heights needs ceil(g / dist) - 1 extra rungs.
        int added = 0;
        int current = 0;
        for (int height : rungs) {
            int gap = height - current;
            added += (gap - 1) / dist;
            current = height;
        }
        return added;
    }
};
