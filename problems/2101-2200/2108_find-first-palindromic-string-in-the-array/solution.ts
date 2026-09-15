function firstPalindrome(words: string[]): string {
    for (const word of words) {
        let left = 0;
        let right = word.length - 1;
        while (left < right && word[left] === word[right]) {
            left++;
            right--;
        }
        if (left >= right) return word;
    }
    return "";
}
