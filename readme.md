# Description
After importing posts from tumblr many posts had extra new line characters.
This script fixes that.

# Usage
Usage: `node index.js [blogName] [user name] [password] [postId]`
where:

* `[blogName]` : from https://[blogName].wordpress.com
* `[user name]` : your wordpress.com user name
* `[password]` : your wordpress.com password
* `[postId]` : id of the post to fix - can be obtained from edit url: https://wordpress.com/post/[blogName].wordpress.com/[postId]

## Details
Script saves a backup of the post in a json file and updates one post at a time by replacing all new line characters `\n` with space ' '
