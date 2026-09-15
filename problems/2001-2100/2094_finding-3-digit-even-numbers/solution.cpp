class Solution {
  public:
    vector<int> findEvenNumbers(vector<int> &digits) {
        array<int, 10> available{};
        for (int digit : digits) {
            available[digit]++;
        }

        vector<int> answer;
        for (int number = 100; number < 1000; number += 2) {
            array<int, 10> needed{};
            needed[number / 100]++;
            needed[number / 10 % 10]++;
            needed[number % 10]++;
            bool possible = true;
            for (int digit = 0; digit < 10; digit++) {
                if (needed[digit] > available[digit]) {
                    possible = false;
                    break;
                }
            }
            if (possible) {
                answer.push_back(number);
            }
        }
        return answer;
    }
};
