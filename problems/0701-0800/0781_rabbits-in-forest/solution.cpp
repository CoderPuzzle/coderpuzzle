class Solution {
  public:
    int numRabbits(vector<int> &answers) {
        // A rabbit answering k fixes its whole color group at k+1 rabbits,
        // and rabbits with different answers can never share one, so every
        // answer value is an independent subproblem. When k is reported c
        // times, those rabbits fill ceil(c / (k+1)) groups - the most one
        // group can hold - and each group counts in full, whether or not
        // all of its rabbits answered.
        unordered_map<int, int> count;
        for (int answer : answers) {
            ++count[answer];
        }
        int total = 0;
        for (const auto &entry : count) {
            int group = entry.first + 1;
            total += (entry.second + group - 1) / group * group;
        }
        return total;
    }
};
