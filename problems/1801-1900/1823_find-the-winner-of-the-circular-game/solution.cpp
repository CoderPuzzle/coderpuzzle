class Solution {
  public:
    int findTheWinner(int n, int k) {
        vector<int> friends(n);
        for (int i = 0; i < n; i++)
            friends[i] = i + 1;
        // idx marks where the next count starts (friend 1 for the first round).
        int idx = 0;
        while (friends.size() > 1) {
            // -1: the starting friend is counted too; % wraps the circle (k may exceed its size).
            idx = (idx + k - 1) % friends.size();
            // The clockwise neighbor shifts into the vacated slot, so idx already
            // points at where the next count must begin — no extra adjustment needed.
            friends.erase(friends.begin() + idx);
        }
        return friends[0];
    }
};
