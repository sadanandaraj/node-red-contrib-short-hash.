const crypto = require('crypto');

module.exports = function(RED) {
    function ShortHashNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        function generateShortHash(inputString, length) {
            const hash = crypto.createHash('sha256').update(inputString).digest('hex');
            return hash.slice(0, length);
        }

        node.on('input', function(msg) {
            const inputString = msg.payload || 'default_input_string';
            const hashLength = config.hashLength || 6;
            const shortHash = generateShortHash(inputString, hashLength);

            msg.shortHash = shortHash;
            node.send(msg);
        });
    }
    RED.nodes.registerType("short-hash", ShortHashNode);
};
