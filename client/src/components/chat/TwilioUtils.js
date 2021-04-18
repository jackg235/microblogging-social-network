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
                console.log('error making or finding channels...');
            });
        });
    });
};

const deleteChannel = (channel) => {

};

const deleteAllChannels = (channel) => {

};

export {
    getChatClient,
    getChannel
}

