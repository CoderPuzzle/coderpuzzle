import "strings"

func uniqueEmailGroups(emails []string) int {
	// A group is identified by its normalized address: the local part
	// loses its dots and anything from the first '+', then both parts
	// are lowercased.
	seen := make(map[string]struct{})
	for _, email := range emails {
		at := strings.IndexByte(email, '@')
		local := email[:at]
		if plus := strings.IndexByte(local, '+'); plus != -1 {
			local = local[:plus]
		}
		local = strings.ReplaceAll(local, ".", "")
		key := strings.ToLower(local) + "@" + strings.ToLower(email[at+1:])
		seen[key] = struct{}{}
	}
	return len(seen)
}
