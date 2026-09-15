function hasMatch(s: string, p: string): boolean {
    // Split at the star: the fixed prefix must occur somewhere and the
    // fixed suffix somewhere after it; the star absorbs whatever sits
    // between the two.
    const star = p.indexOf("*");
    const pre = p.slice(0, star);
    const suf = p.slice(star + 1);
    const first = s.indexOf(pre);
    const last = s.lastIndexOf(suf);
    return first !== -1 && last !== -1 && first + pre.length <= last;
}
