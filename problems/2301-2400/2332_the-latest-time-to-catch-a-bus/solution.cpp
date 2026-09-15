class Solution {
  public:
    int latestTimeCatchTheBus(vector<int> &buses, vector<int> &passengers, int capacity) {
        sort(buses.begin(), buses.end());
        sort(passengers.begin(), passengers.end());
        int m = passengers.size();
        int boarded = 0;
        int j = 0;
        for (int bus : buses) {
            boarded = 0;
            while (j < m && boarded < capacity && passengers[j] <= bus) {
                j++;
                boarded++;
            }
        }
        int answer = boarded < capacity ? buses.back() : passengers[j - 1] - 1;
        unordered_set<int> taken(passengers.begin(), passengers.end());
        while (taken.count(answer)) {
            answer--;
        }
        return answer;
    }
};
