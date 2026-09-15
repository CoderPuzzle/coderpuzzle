class Solution {
  public:
    int timeRequiredToBuy(vector<int> &tickets, int k) {
        int target = tickets[k];
        int elapsed = 0;
        for (int index = 0; index < static_cast<int>(tickets.size()); ++index) {
            elapsed += min(tickets[index], index <= k ? target : target - 1);
        }
        return elapsed;
    }
};
