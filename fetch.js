facts = []
const d = new Date()
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
today = monthNames[d.getMonth()] +' ' + d.getDate()
$.getJSON('https://en.wikipedia.org/api/rest_v1/page/mobile-sections/'+ monthNames[d.getMonth()] + '_' + d.getDate() , function (data) {
    id = [-1]
    inside = false
    $.each(data.lead.sections, function (i, section) {
        if (section.hasOwnProperty('anchor')) {
            if (section.anchor == 'Events') {
                inside=true
                id[0] = section.id - 1
            }
            else if(inside && section.toclevel==2){
                id.push(section.id-1)
            }else if(inside){
                inside=false
            }
        }
    })
    $.each(id,function(i,curID){
        bullets = $.trim(data.remaining.sections[curID].text).split('\n')
        $.each(bullets, function (i, fact) {
            f = fact.replace(/<[^>]*>/g, '').replace(/\[[^ ]*\]/g, '').split(/–(.+)/)
            f[0] = $.trim(f[0])
            f[1] = $.trim(f[1])
            facts.push(f)
        })
    })
    console.log(facts.length + ' facts parsed -- Ready!')
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
})