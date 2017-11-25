import Reflux from 'reflux';
import $ from 'jquery';
import Config from 'config';

const LogActions = Reflux.createActions([
    'constantly'
]);

const LogStore = Reflux.createStore({
    listenables: [LogActions],

    onConstantly: function () {
        var self = this;

        var url = Config.url + '/mgr/logs/constantly';

        $.ajax({
            url: url,
            type: 'GET',
            dataType: "json",
            headers: {
                appid: Config.appid
            },
            data: {},
            success: function (data, status) {
                self.trigger('constantly', data);
            },
            error: function (reason) {
                console.log('error',reason);
            }
        });
    }
});

exports.LogActions = LogActions;
exports.LogStore = LogStore;