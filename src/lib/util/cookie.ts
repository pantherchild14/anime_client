import { useState } from 'react';

export const GetLocalStorage = (localStorageKey: string): [string | null, (newValue: string) => void] => {
    const [value, setValue] = useState(() => {
        return localStorage.getItem(localStorageKey) || null;
    });

    const updateValue = (newValue: string) => {
        setValue(newValue);
        localStorage.setItem(localStorageKey, newValue);
    };

    return [value, updateValue];
};


// Function to set a cookie
export const setCookie = (name: string, value: any, days: number | undefined): void => {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = `; expires=${date.toUTCString()}`;
    }

    const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);

    document.cookie = `${name}=${stringValue || ''}${expires}; path=/`;
};


// Function to get a cookie by name
export const getCookie = (name: string): string | null => {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
};

// Function to delete a cookie by name
export const eraseCookie = (name: string): void => {
    document.cookie = `${name}=; Max-Age=-99999999;`;
};