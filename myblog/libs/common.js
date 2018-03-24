const crypto = require('crypto');

/**
 * MD5_SUFFIX -- 在md5加密的时候 增加这么一坨东西 
 */

module.exports = {
    MD5_SUFFIX:'fkldsf%^%%^dahdjhada撒大声地sda',
    md5(str) {
        let md5 = crypto.createHash('md5');

        md5.update(str);

        return md5.digest('hex');

    }
}