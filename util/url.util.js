class UrlUtil {

    static getUrlSuffix(s) {
        var re = /\.([^\/\.\?]+?)(\?|$)/;
        var m = re.exec(s);
        if (m != null) return m[1];
    }

    static parseUrl(url) {
        var _url = url;
        var _param = {};
        if (url.indexOf('?') != -1) {
            var url_array = url.split('?');
            _url = url_array[0];

            var url_param = url_array[1];
            var param_array = url_param.split('&');
            param_array.forEach(pair => {
                try {
                    var pair_array = pair.split('=');
                    _param[pair_array[0]] = pair_array[1];
                } catch (error) {
                    console.error(error);
                }
            });
        }

        return {
            url: _url,
            param: _param
        };
    }
}

module.exports = UrlUtil;