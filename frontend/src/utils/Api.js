export const authFetch = (url, options = {}) => {
    const token = localStorage.getItem("token");
    const headers = {
        ...(options.headers || {}),
        ...(token && token !== "guest" ? { Authorization: `Bearer ${token}` } : {})
    };
    return fetch(url, { ...options, headers });
};

export const getJSON = async (url, options = {}) => {
    const res = await authFetch(url, options);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "API error");
    return data;
};