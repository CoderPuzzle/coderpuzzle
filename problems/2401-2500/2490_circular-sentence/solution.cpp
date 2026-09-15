class Solution {
  public:
    bool isCircularSentence(string sentence) {
        // A sentence is circular exactly when every space joins a matching
        // last-to-first pair and the endpoints wrap: sentence[0] is the
        // first character of the first word and sentence[n - 1] the last
        // character of the last word. Bail out at the first broken junction.
        for (int i = 0; i < (int)sentence.size(); i++) {
            if (sentence[i] == ' ' && sentence[i - 1] != sentence[i + 1]) {
                return false;
            }
        }
        return sentence[0] == sentence[sentence.size() - 1];
    }
};
