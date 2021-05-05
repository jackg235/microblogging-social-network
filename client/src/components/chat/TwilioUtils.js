import axios from "axios";
const TwilioChat = require("twilio-chat");


const getToken = (auth) => {
    // const identity = auth.email;
    const identity = 'b@gmail.com';
    return axios.get('http://localhost:5000/universal/token', {params: { identity: identity }})
        .then(res => res.data.token)
        .catch(error => {
        if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
    });
};

const getChatClient = (auth) => {
    return getToken(auth).then(token => TwilioChat.Client.create(token)).then(client => {
        // client auto renews tokens
        client.on('tokenAboutToExpire', () => {
            getToken().then(token => {
                client.updateToken(token);
            });
        });
        client.on('tokenExpired', () => {
            getToken().then(token => {
                client.updateToken(token);
            });
        });

        return client;
    }).catch(err => {
        console.log(err);
    });
};

const getChannel = (cli, fromEmail, toEmail) => {
    console.log(cli);
    return cli.getChannelByUniqueName(`${fromEmail}:${toEmail}`).then(room => {
        console.log(room);
        return room;
    }).catch(e => {
        return cli.getChannelByUniqueName(`${toEmail}:${fromEmail}`).then(room => {
            console.log(room);
            return room;
        }).catch(e => {
            // Make new channel
            return cli.createChannel(
                {
                    uniqueName: `${fromEmail}:${toEmail}`,
                    friendlyName: `${fromEmail}:${toEmail}`,
                }
            ).then(room => {
                console.log(room);
                return room;
            }).catch(e => {
                console.log('error making finding channels...');
            });
        });
    });
};

const getFirstMessages = async (page) => {
    let curr = page;
    while (curr.hasPrevPage) {
        console.log(curr.hasPrevPage);
        curr = await curr.prevPage()
    }
    console.log(curr.hasPrevPage, 'very first page');
    return sortByIndex(curr.items).slice(0, 10);
};

const getMoreMessages = async (channel, afterIdx, lim) => {
    var page = await channel.getMessages();
    while (page.hasNextPage) {
        console.log('has a next page fh349iurfnekj')
        page = await page.nextPage();
    }
    console.log(`page of messages after ${afterIdx}`, page);
    const msgArr = [];
    while (true) {
        if (msgArr.length === lim) {
            break;
        }
        page.items.forEach(msg => {
            const diff = msg.index - afterIdx;
            if (diff > 0 && diff <= lim) {
                msgArr.push(msg)
            }
        });
        if (page.hasPrevPage) {
            page = await page.prevPage();
        } else {
            break;
        }
    }
    if (msgArr.length === 0) {
        return null;
    }
    const out = sortByIndex(msgArr);
    console.log(out);
    return out;
};

const getAllMessages = async () => {};

const sortByIndex = (array) => {
    return array.sort((a, b) => {
        var x = a['index']; 
        var y = b['index'];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
};

const deleteChannel = (channel) => {

};

const deleteAllChannels = (channel) => {

};

export {
    getChatClient,
    getChannel, 
    getFirstMessages,
    getMoreMessages,
    sortByIndex
}

