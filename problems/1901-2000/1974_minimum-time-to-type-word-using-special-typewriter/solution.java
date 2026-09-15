class Solution {

    public int minTimeToType(String word) {
        // The pointer sits on a 26-letter ring. Between two consecutive
        // letters there are only two arcs — clockwise and counterclockwise
        // — and the cheaper one is always optimal, because the cost to
        // type every future character does not depend on which arc was
        // taken (only the final position matters, which is the same either
        // way). Sum the cheaper arc for each letter, then add one second
        // per character for typing it.
        int seconds = word.length();
        int pos = 0; // pointer starts on 'a'
        for (int i = 0; i < word.length(); i++) {
            int target = word.charAt(i) - 'a';
            int diff = Math.abs(target - pos);
            seconds += Math.min(diff, 26 - diff);
            pos = target;
        }
        return seconds;
    }
}
