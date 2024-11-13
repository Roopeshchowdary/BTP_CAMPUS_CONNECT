export function getAbbreabtionName(name) {
    return name.split(' ').map((item) => item[0]).join('').toUpperCase()
}

export function timeAgo(timestamp) {
    const currentDate = new Date();
    const targetDate = new Date(timestamp);

    const timeDifference = currentDate - targetDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
        return seconds + (seconds === 1 ? ' second ago' : ' seconds ago');
    } else if (minutes < 60) {
        return minutes + (minutes === 1 ? ' minute ago' : ' minutes ago');
    } else if (hours < 24) {
        return hours + (hours === 1 ? ' hour ago' : ' hours ago');
    } else if (days < 7) {
        return days + (days === 1 ? ' day ago' : ' days ago');
    } else {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return targetDate.toLocaleDateString(undefined, options);
    }
}
