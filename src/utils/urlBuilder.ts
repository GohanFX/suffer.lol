enum URLTypes {
    
}

class URLBuilder {
    static buildUrl(baseUrl: string, params: { [key: string]: string }) {
        const url = new URL(baseUrl);
        Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
        return url.toString();
    }
}