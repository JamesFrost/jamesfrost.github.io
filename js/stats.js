$(document).ready(function () 
{ 
    twitter = new Highcharts.Chart({
        chart: {
            renderTo : 'twitter',
            type: 'line'
        },
        title: {
            text: 'Twitter'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        series: [{
            name: 'Followers'
        }, {
            name: 'Statuses'
        }]
    });    

    github = new Highcharts.Chart({
        chart: {
            renderTo : 'github',
            type: 'line'
        },
        title: {
            text: 'Github'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        series: [{
            name: 'Disk Usage'
        }, {
            name: 'Repos'
        }, {
            name: 'Followers'
        }]
    });   

    getTwitterStats(populateTwitterGraph);
    getGithubStats(populateGithubGraph);
});

function populateTwitterGraph(data)
{
    var followers = [];
    var statuses = [];
    data.forEach(function(entry)
    {
        followers.push([entry['date_saved'], entry['followers_count']]);
        statuses.push([entry['date_saved'], entry['statuses_count']]);
    });

    twitter.series[0].setData(followers, true);
    twitter.series[1].setData(statuses, true);
}

function populateGithubGraph(data)
{
    var diskusage = [];         
    var repos = [];         
    var followers = [];         
    data.forEach(function(entry)
    {
        diskusage.push([entry['date_saved'], entry['disk_usage']]);
        repos.push([entry['date_saved'], entry['public_repos']]);
        followers.push([entry['date_saved'], entry['followers']]);
    });

    github.series[0].setData(diskusage, true);
    github.series[1].setData(repos, true);
    github.series[2].setData(followers, true);
}
