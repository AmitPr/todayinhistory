# Today In History
Today In History was a short coding project, scraping wikipedia for unique events that occured on that day, and showing a random one to the user. All information is courtesy of [Wikipedia](http://www.wikipedia.org)!
## How It works
Using jQuery's [getJSON](https://api.jquery.com/jQuery.getJSON/) function, and the wikipedia [REST API](https://en.wikipedia.org/api/rest_v1/), a JSON object is obtained, containing the wikipedia page for the day. For example, if today were to be January 1, then the JSON would be retrieved from:
> https://en.wikipedia.org/api/rest_v1/page/mobile-sections/January_1  

The JSON response contains two important sections: A header, which acts as a Table of Contents for the page, and the Content, which contains the text of each section. The JSON is parsed, first searching for the "Events" section (and any subsections, which is the case for January 1), before jumping to those sections. It then extracts the plain text facts from the HTML representation (using a simpe regex expression), as well as getting rid of the footnote links that wikipedia tends to include before finally displaying the result.  