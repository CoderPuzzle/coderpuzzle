class Solution {
  public:
    int matchPlayersAndTrainers(vector<int> &players, vector<int> &trainers) {
        sort(players.begin(), players.end());
        sort(trainers.begin(), trainers.end());
        // Greedy: pair the weakest unmatched player with the weakest
        // unmatched trainer — optimal by an exchange argument.
        int i = 0;
        int j = 0;
        int matches = 0;
        while (i < (int)players.size() && j < (int)trainers.size()) {
            if (players[i] <= trainers[j]) {
                matches += 1;
                i += 1;
                j += 1;
            } else {
                // Trainer too weak for the weakest remaining player; players
                // only get stronger, so it is useless forever — skip it.
                j += 1;
            }
        }
        return matches;
    }
};
