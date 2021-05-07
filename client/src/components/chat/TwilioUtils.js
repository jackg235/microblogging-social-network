import axios from "axios";

const TwilioChat = require("twilio-chat");


const getToken = (auth) => {
    // const identity = auth.email;
    const identity = 'b@gmail.com';
    return axios.get('/universal/token', {params: {identity: identity}})
        .then(res => res.data.token)
        .catch(error => console.log(error));
};

const getChatClient = (auth) => {
    return getToken(auth)
        .then(token => TwilioChat.Client.create(token))
        .then(client => {
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
        })
        .catch(err => console.log(err));
};

const getChannel = (cli, fromEmail, toEmail) => {
    return cli.getChannelByUniqueName(`${fromEmail}:${toEmail}`)
        .catch(e => {
            return cli.getChannelByUniqueName(`${toEmail}:${fromEmail}`)
                .catch(e => {
                    // Make new channel
                    return cli.createChannel({
                        uniqueName: `${fromEmail}:${toEmail}`,
                        friendlyName: `${fromEmail}:${toEmail}`
                    })
                        .catch(e => {
                            console.log('error making finding channels...');
                        });
                });
        });
};

// get first 10 messages
const getFirstMessages = async (page) => {
    let curr = page;
    while (curr.hasPrevPage) {
        curr = await curr.prevPage()
    }
    return sortByIndex(curr.items).slice(0, 10);
};

// get up to lim next messages
const getMoreMessages = async (channel, afterIdx, lim) => {
    var page = await channel.getMessages();
    while (page.hasNextPage) {
        page = await page.nextPage();
    }
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
    return out;
};

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
