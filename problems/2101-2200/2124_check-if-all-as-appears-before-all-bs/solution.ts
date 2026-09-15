function checkString(s: string): boolean {
    let seenB = false;
    for (const character of s) {
        if (character === "b") {
            seenB = true;
        } else if (seenB) {
            return false;
        }
    }
    return true;
}
