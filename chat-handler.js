'use strict';

const service = require('./service');

module.exports = {
  onMessageDelete: async (client, after, before) => {
    if (before && before.body.length > 0) {
      const user = await before.getContact();
      client.sendMessage(before.from, `Udah kebaca @${user.id.user} 😋`, {mentions: [user]});
      client.sendMessage(before.from, `-->  ${before.body}`);
    } else {
      client.sendMessage(after.from, 'Ah gak sempet baca 🤨');
    }
  },
  onMessageReceived: async (client, msg) => {
    const mentions = await msg.getMentions();
    const sender = await msg.getContact();
    const message = msg.body.trim().toLocaleLowerCase();
    const chat = await msg.getChat();

    let isMentioned = false;
    for(let contact of mentions) {
      if (contact.verifiedName === 'R.I.S.K.A Tech') isMentioned = true;
    }

    if (message === 'hi') {
      client.sendMessage(msg.from, `Hi juga @${sender.id.user}`, {
        mentions: [sender]
      });
    }

    if (message === 'riska') {
      client.sendMessage(msg.from, 'Muda, Gaul, Berkarya!');
    }

    if (message === 'bmaq') {
      client.sendMessage(msg.from, 'Quran for life, Mumtaaz!');
    }
  }
};
