function reversePrefix(s: string, k: number): string {
    // Mutable buffer; two pointers close on the middle of the prefix.
    const chars: string[] = s.split("");
    let left = 0;
    let right = k - 1;
    while (left < right) {
        const tmp = chars[left];
        chars[left] = chars[right];
        chars[right] = tmp;
        left++;
        right--;
    }
    return chars.join("");
}
