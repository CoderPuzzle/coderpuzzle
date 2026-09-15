function minimumChairs(s: string): number {
    let people = 0;
    let chairs = 0;
    for (const event of s) {
        if (event === "E") {
            people++;
            if (people > chairs) {
                chairs = people;
            }
        } else {
            people--;
        }
    }
    return chairs;
}
