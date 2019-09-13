const contentTypeDetector = (extname) => {
    switch (extname) {
    case '.js':
        return 'text/javascript';
    case '.map':
        return 'text/javascript';
    case '.ico':
        return 'image/x-icon';
    case '.css':
        return 'text/css';
    case '.json':
        return 'application/json';
    case '.png':
        return 'image/png';
    case '.jpg':
        return 'image/jpg';
    case '.wav':
        return 'audio/wav';
    case '.svg':
        return 'image/svg+xml';
    default:
        return 'text/html; charset=utf-8';
    }
};

export default contentTypeDetector;
