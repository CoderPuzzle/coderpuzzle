class Solution {
  public:
    bool strongPasswordCheckerII(string password) {
        if (password.size() < 8) {
            return false;
        }
        string special = "!@#$%^&*()-+";
        bool has_lower = false, has_upper = false, has_digit = false, has_special = false;
        for (int index = 0; index < static_cast<int>(password.size()); index++) {
            char current = password[index];
            if (index > 0 && current == password[index - 1]) {
                return false;
            }
            if (current >= 'a' && current <= 'z') {
                has_lower = true;
            } else if (current >= 'A' && current <= 'Z') {
                has_upper = true;
            } else if (current >= '0' && current <= '9') {
                has_digit = true;
            } else if (special.find(current) != string::npos) {
                has_special = true;
            }
        }
        return has_lower && has_upper && has_digit && has_special;
    }
};
