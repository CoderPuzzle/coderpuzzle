class Solution {

    // Split at the star: the fixed prefix must occur somewhere and the
    // fixed suffix somewhere after it; the star absorbs whatever sits
    // between the two.
    public boolean hasMatch(String s, String p) {
        int star = p.indexOf('*');
        String pre = p.substring(0, star);
        String suf = p.substring(star + 1);
        int first = s.indexOf(pre);
        int last = s.lastIndexOf(suf);
        return first != -1 && last != -1 && first + pre.length() <= last;
    }
}
