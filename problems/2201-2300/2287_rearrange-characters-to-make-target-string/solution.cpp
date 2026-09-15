class Solution {
  public:
    int rearrangeCharacters(string s, string target) {
        array<int, 26> have{}, need{};
        for (char ch : s)
            have[ch - 'a']++;
        for (char ch : target)
            need[ch - 'a']++;
        int answer = 100;
        for (int ch = 0; ch < 26; ch++) {
            if (need[ch] == 0)
                continue;
            answer = min(answer, have[ch] / need[ch]);
        }
        return answer;
    }
};
