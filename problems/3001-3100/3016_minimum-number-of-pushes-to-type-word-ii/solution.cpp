class Solution {
  public:
    int minimumPushes(string word) {
        array<int, 26> counts{};
        for (char letter : word) {
            counts[letter - 'a']++;
        }
        sort(counts.begin(), counts.end(), greater<int>());
        int answer = 0;
        for (int index = 0; index < 26; index++) {
            answer += counts[index] * (index / 8 + 1);
        }
        return answer;
    }
};
