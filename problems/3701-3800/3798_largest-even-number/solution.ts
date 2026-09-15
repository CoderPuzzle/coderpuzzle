function largestEven(s: string): string {
    // An even result must end in '2', and a longer number of these digits
    // always beats a shorter one, so the best keeps every character up
    // through the last '2' and sheds the odd tail.
    const i = s.lastIndexOf("2");
    return i < 0 ? "" : s.slice(0, i + 1);
}
