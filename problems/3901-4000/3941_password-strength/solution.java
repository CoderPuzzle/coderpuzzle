class Solution {

    public int passwordStrength(String password) {
        boolean[] lower = new boolean[26];
        boolean[] upper = new boolean[26];
        boolean[] digit = new boolean[10];
        boolean[] special = new boolean[4];
        String specials = "!@#$";
        for (int i = 0; i < password.length(); i++) {
            char value = password.charAt(i);
            if (value >= 'a' && value <= 'z') lower[value - 'a'] = true;
            else if (value >= 'A' && value <= 'Z') upper[value - 'A'] = true;
            else if (value >= '0' && value <= '9') digit[value - '0'] = true;
            else {
                int index = specials.indexOf(value);
                if (index >= 0) special[index] = true;
            }
        }
        int answer = 0;
        for (boolean present : lower) if (present) answer++;
        for (boolean present : upper) if (present) answer += 2;
        for (boolean present : digit) if (present) answer += 3;
        for (boolean present : special) if (present) answer += 5;
        return answer;
    }
}
