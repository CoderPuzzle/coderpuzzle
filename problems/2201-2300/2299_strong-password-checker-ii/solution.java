class Solution {

    public boolean strongPasswordCheckerII(String password) {
        if (password.length() < 8) {
            return false;
        }
        String special = "!@#$%^&*()-+";
        boolean hasLower = false,
            hasUpper = false,
            hasDigit = false,
            hasSpecial = false;
        for (int index = 0; index < password.length(); index++) {
            char current = password.charAt(index);
            if (index > 0 && current == password.charAt(index - 1)) {
                return false;
            }
            if (current >= 'a' && current <= 'z') {
                hasLower = true;
            } else if (current >= 'A' && current <= 'Z') {
                hasUpper = true;
            } else if (current >= '0' && current <= '9') {
                hasDigit = true;
            } else if (special.indexOf(current) >= 0) {
                hasSpecial = true;
            }
        }
        return hasLower && hasUpper && hasDigit && hasSpecial;
    }
}
