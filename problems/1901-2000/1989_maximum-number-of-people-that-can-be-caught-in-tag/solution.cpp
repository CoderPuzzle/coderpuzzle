class Solution {
  public:
    int catchMaximumAmountofPeople(vector<int> &team, int dist) {
        // Two-pointer greedy over the sorted "it" and "not it" positions:
        // each "it" catches the leftmost uncaught person within its reach.
        vector<int> it, notIt;
        for (int i = 0; i < (int)team.size(); ++i) {
            if (team[i] == 1)
                it.push_back(i);
            else
                notIt.push_back(i);
        }
        int i = 0, j = 0, caught = 0;
        while (i < (int)it.size() && j < (int)notIt.size()) {
            int itPos = it[i], notPos = notIt[j];
            if (notPos < itPos - dist)
                ++j; // too far left: can never be caught
            else if (notPos > itPos + dist)
                ++i; // too far right for this "it"
            else {
                ++caught;
                ++i;
                ++j;
            }
        }
        return caught;
    }
};
