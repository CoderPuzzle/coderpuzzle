class Solution {
  public:
    string compressedString(string word) {
        // One sweep over the runs of equal characters, slicing each run
        // into chunks of at most nine because that is all one operation may
        // remove -- a length-14 run therefore encodes as "9c5c".
        string comp;
        comp.reserve(word.size() * 2);
        int i = 0;
        int n = (int)word.size();
        while (i < n) {
            char c = word[i];
            int j = i;
            while (j < n && word[j] == c && j - i < 9) {
                j++;
            }
            comp += to_string(j - i);
            comp += c;
            i = j;
        }
        return comp;
    }
};
