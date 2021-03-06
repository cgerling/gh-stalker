export const local = {
    get(key) {
        return JSON.parse(localStorage.getItem(key));
    },
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    remove(key) {
        localStorage.removeItem(key);
    }
};

export const session = {
    get(key) {
        return JSON.parse(sessionStorage.getItem(key));
    },
    set(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    },
    remove(key) {
        sessionStorage.removeItem(key);
    }
};

export const keys = {
    MOST_VIEWED: 'MOST_VIEWED',
    LAST_SEARCH: 'LAST_SEARCH',
    SETTINGS: 'SETTINGS'
}