/*jshint esversion: 6, node: true*/
const Wordpress = require("wordpress");
const FS = require('fs');

if(!process.argv[2] || !process.argv[3] || !process.argv[4] || !process.argv[5]){
    console.log("Usage: node index.js [blogName] [user name] [password] [postId]\nwhere:\n ");
    console.log("* [blogName] : from https://[blogName].wordpress.com");
    console.log("* [user name] : your wordpress.com user name");
    console.log("* [password] : your wordpress.com password");
    console.log("* [postId] : id of the post to fix - can be obtained from edit url: https://wordpress.com/post/[blogName].wordpress.com/[postId]");
    return;
}

const client = Wordpress.createClient({
    url: `https://${process.argv[2]}.wordpress.com`,
    username: process.argv[3],
    password: process.argv[4]
});

client.getPost(parseInt(process.argv[5]), (error, post) => {

    if(error) {
        return console.error(error);
    }

    fixPost(post);
});

function fixPost(post) {

    const backup = JSON.stringify(post);
    const fileName = `${post.id}.json`;

    if(!fileName || !backup || backup.length === 0) {
        return console.log('something went wrong');
    }

    FS.writeFile(fileName, backup, function(err) {
        if (err) {
            return console.error(err);
        }

        console.log(`file ${post.id}.json saved`);

        const newContent = post.content.replace(/\r?\n|\r/g, ' ');

        console.log(`----\nold: \n${post.content}\n-----\nnew:\n${newContent}-----\n`);

        // client.editPost( id, data, callback )
        // Edits an existing post.
        //
        // id: The ID of the post to edit.
        // data: The data to update on the post.
        // callback (function( error )): A callback to invoke when the API call is complete.

        client.editPost(post.id, {
            content: newContent
        }, (err) => {

              if(err) {

                  return error.log(err);
              }

              console.log(`Post ${post.id} updated`);
        });
    });

}
