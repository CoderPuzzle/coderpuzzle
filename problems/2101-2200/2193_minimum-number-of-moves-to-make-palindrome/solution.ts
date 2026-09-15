function minMovesToMakePalindrome(s: string): number {
    const a: string[] = s.split("");
    let moves = 0;
    let left = 0,
        right = a.length - 1;
    while (left < right) {
        if (a[left] === a[right]) {
            left += 1;
            right -= 1;
            continue;
        }
        // find rightmost occurrence of a[left] in (left, right]
        let k = right;
        while (k > left && a[k] !== a[left]) {
            k -= 1;
        }
        if (k === left) {
            // a[left] is the lone middle character: nudge it one step inward
            const t = a[left];
            a[left] = a[left + 1];
            a[left + 1] = t;
            moves += 1;
        } else {
            // bubble a[k] rightward to position right
            while (k < right) {
                const t = a[k];
                a[k] = a[k + 1];
                a[k + 1] = t;
                k += 1;
                moves += 1;
            }
            left += 1;
            right -= 1;
        }
    }
    return moves;
}
