class Solution {
  public:
    int addMinimum(string word) {
        // Two pointers over word and the repeating pattern "abc": every
        // aligned pattern slot the word fails to consume is a letter that
        // must be inserted there.
        int answer = 0;
        int k = 0;
        int i = 0;
        const string pattern = "abc";
        while (k < (int)word.size()) {
            if (word[k] == pattern[i % 3]) {
                k++;
            } else {
                answer++;
            }
            i++;
        }
        // After the last consumed letter, finish off its cycle.
        return answer + (3 - i % 3) % 3;
    }
};
