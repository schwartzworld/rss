# RSSeddit

I'm open to suggestions for a better name to the project.

Reddit has become a toxic pit and Facebook has always been blatantly evil. I don't want to go on either anymore, but I still need something to do with myself during periods of downtime because I can't be alone with my own thoughts for a second.

I mainly go on Reddit for a few small hobbyist subreddits, but otherwise the site has little to offer. I am a JavaScript developer (reluctantly Typescript), and I read a lot about the web and the subject of programming. RSS is a natural choice as most of the good articles come from personal blogs anyway.

## Installation

Clone this repo, run `yarn` to install deps, launch the server with `node index.mjs -s` and navigate to `localhost:3001`. Upvote an article to mark it as 'liked', downvote to never see it again.

## FAQ

- Why build an RSS Reader instead of using POPULAR_RSS_APP?

I have been looking to build a full stack app using ExpressJS anyway, and it is faster to build it to match my usage than to learn a new app. 

- Why did you include your DB in the repo?

SQLite3 is an awesome product. Its single file format allows you to use version control as a backup. I am more experienced in front-end development, and so I assumed (correctly) that I would end up accidentally losing data pretty often. DBs don't exactly have an undo history. I committed my DB into the repo for convenience so I could easily recover anything I accidentally borked. I decided to leave it in as a starter feed for anybody else who decides to give the app a try. If you aren't interested in programming, you won't like my feed.

- Why SSR?

I use React at work, so I like to avoid using it in hobby projects. I actually really like React, but I don't like using it at home. Besides, the better you are at vanilla JS, the better you become at React.

- Why node/sqlite3/EJS/UNPOPULAR_TECHNOLOGY_CHOICE not POPULAR_TECHNOLOGY?

I used what I used. Don't think about it too hard. If you think you could do better, please submit a PR. 

- Who are you?

I'm just this guy, you know? See more of me at https://www.schwartz.world