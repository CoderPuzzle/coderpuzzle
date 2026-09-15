function capitalizeTitle(title: string): string {
    return title
        .split(" ")
        .map((word) => {
            const lowered = word.toLowerCase();
            return word.length <= 2 ? lowered : lowered[0].toUpperCase() + lowered.slice(1);
        })
        .join(" ");
}
