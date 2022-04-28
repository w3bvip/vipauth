export function clearFunction(user, cookies) {
    let { name, value } = user;
    if (name && value) {
        return cookies.parse("name");
    } else {
        return false;
    }
}
