// Type characters into one growing buffer: letters append, and each
// 'i' reverses everything typed so far. After the last keystroke the
// buffer is exactly the laptop screen.
function finalString(s: string): string {
    const screen: string[] = [];
    for (const c of s) {
        if (c === "i") {
            screen.reverse();
        } else {
            screen.push(c);
        }
    }
    return screen.join("");
}
