class Solution {
  public:
    int minimumChairs(string s) {
        int people = 0;
        int chairs = 0;
        for (char event : s) {
            if (event == 'E') {
                people++;
                chairs = max(chairs, people);
            } else {
                people--;
            }
        }
        return chairs;
    }
};
