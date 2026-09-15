/**
 * @param {string} a
 * @param {string} b
 * @return {boolean}
 */
var checkPalindromeFormation = function (a, b) {
    function isPalindrome(s, left, right) {
        while (left < right) {
            if (s[left] !== s[right]) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    function check(x, y) {
        let left = 0;
        let right = x.length - 1;
        while (left < right && x[left] === y[right]) {
            left++;
            right--;
        }
        if (left >= right) {
            return true;
        }
        return isPalindrome(x, left, right) || isPalindrome(y, left, right);
    }

    return check(a, b) || check(b, a);
};
