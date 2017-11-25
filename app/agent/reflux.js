import Reflux from 'reflux';
import $ from 'jquery';
import Config from 'config';

const AgentActions = Reflux.createActions([
    'constantly'
]);

const AgentStore = Reflux.createStore({
    listenables: [AgentActions],

    onConstantly: function () {
        var self = this;

        var url = Config.url + '/mgr/agents';

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

exports.AgentActions = AgentActions;
exports.AgentStore = AgentStore;