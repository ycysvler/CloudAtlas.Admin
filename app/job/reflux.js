import Reflux from 'reflux';
import $ from 'jquery';
import Config from 'config';

const JobActions = Reflux.createActions([
    'jobs',
    'enterprises',
    'results'
]);

const JobStore = Reflux.createStore({
    listenables: [JobActions],
    onJobs:function(entid){
        var self = this;
        var url = Config.url + '/mgr/ent/' + entid + '/job';

        $.ajax({
            url: url,
            type: 'GET',
            dataType: "json",
            headers: {
                appid: Config.appid
            },
            data: {},
            success: function (data, status) {
                self.trigger('jobs', data);
            },
            error: function (reason) {
                console.log('error',reason);
            }
        });
    },
    onEnterprises:function(){
        var self = this;
        var url = Config.url + '/mgr/enterprises';

        $.ajax({
            url: url,
            type: 'GET',
            dataType: "json",
            headers: {
                appid: Config.appid
            },
            data: {},
            success: function (data, status) {
                self.trigger('enterprises', data);
            },
            error: function (reason) {
                console.log('error',reason);
            }
        });
    },
    onResults:function (entid, jobid, source, imagetype, featuretype) {
        var self = this;
        var url = Config.url + '/mgr/ent/' + entid + '/job/' + jobid + '/' + source + '/' + imagetype + '/' + featuretype;

        $.ajax({
            url: url,
            type: 'GET',
            dataType: "json",
            headers: {
                appid: Config.appid
            },
            data: {},
            success: function (data, status) {
                self.trigger('results', data);
            },
            error: function (reason) {
                console.log('error',reason);
            }
        });
    }

});

exports.JobActions = JobActions;
exports.JobStore = JobStore;