function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

export function stringAvatar(name) {
    var shortName;
    if (name.split(' ').length > 1) {
        shortName = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;
    } else {
        shortName = `${name.split(' ')[0][0]}`;
    }
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: shortName,
    };
}