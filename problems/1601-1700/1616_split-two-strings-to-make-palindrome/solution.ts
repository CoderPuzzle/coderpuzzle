function checkPalindromeFormation(a: string, b: string): boolean {
    function isPalindrome(s: string, left: number, right: number): boolean {
        while (left < right) {
            if (s[left] !== s[right]) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    function check(x: string, y: string): boolean {
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
}
