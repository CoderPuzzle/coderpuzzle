class Solution {
  public:
    int minTimeToType(string word) {
        // The pointer sits on a 26-letter ring. Between two consecutive
        // letters there are only two arcs — clockwise and counterclockwise
        // — and the cheaper one is always optimal, because the cost to
        // type every future character does not depend on which arc was
        // taken (only the final position matters, which is the same either
        // way). Sum the cheaper arc for each letter, then add one second
        // per character for typing it.
        int seconds = (int)word.size();
        int pos = 0; // pointer starts on 'a'
        for (char ch : word) {
            int target = ch - 'a';
            int diff = std::abs(target - pos);
            seconds += std::min(diff, 26 - diff);
            pos = target;
        }
        return seconds;
    }
};
