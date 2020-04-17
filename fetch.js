facts = []
const d = new Date()
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
today = monthNames[d.getMonth()] +' ' + d.getDate()
$.getJSON('https://en.wikipedia.org/api/rest_v1/page/mobile-sections/' + monthNames[d.getMonth()] + '_' + d.getDate(), function (data) {
    id = -1
    $.each(data.lead.sections, function (i, section) {
        if (section.hasOwnProperty('anchor')) {
            if (section.anchor == 'Events') {
                id = section.id - 1
            }
        }
    })
    bullets = $.trim(data.remaining.sections[id].text).split('\n')
    $.each(bullets, function (i, fact) {
        f = fact.replace(/<[^>]*>/g, '').replace(/\[[^ ]*\]/g, '').split(/–(.+)/)
        f[0] = $.trim(f[0])
        f[1] = $.trim(f[1])
        facts.push(f)
    })
    refreshFact()
})
function refreshFact() {
    fact = facts[Math.floor(Math.random() * facts.length)];
    yr = document.getElementsByClassName("year")[0]
    yr.innerHTML = today + ' ' + fact[0]
    evt = document.getElementsByClassName("event")[0]
    evt.innerHTML = fact[1]
}
$(document).ready(function () {
    date = document.getElementsByClassName("date")[0]
    date.innerHTML = today
    date.href='https://en.wikipedia.org/wiki/' + monthNames[d.getMonth()]+'_'+d.getDate()+'#Events'
    $('#bg').on('mousedown', function (e) {
        refreshFact();
    });
})