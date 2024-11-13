
function debounce(func, wait) {
    let timeout;

    return function executedFunction(...args) {
        return new Promise((resolve, reject) => {
            const later = async () => {
                timeout = null;
                try {
                    const result = await func(...args);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            };

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        });
    };
}

function cacheWrapper(func) {
    const cache = new Map();

    return function (...args) {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            return cache.get(key);
        } else {
            const result = func.apply(this, args);
            cache.set(key, result);
            return result;
        }
    };
}


export { debounce, cacheWrapper };