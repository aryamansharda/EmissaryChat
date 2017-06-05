'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('Hi! I\'m Emissay!')
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('What\'s your name?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Great! I'll call you ${name}`))
                .then(() => 'howToHelp');
        }
    },

    howToHelp: {
        prompt: (bot) => bot.say('How can I help you today? \n 1) New Appointment (NA) \n 2) Cancel Appointment (CA) \n 3) Reschedule Appointment (RA) \n 4) Live Chat (LC)'),
        receive: (bot, message) => {
            const task = message.text;
            return bot.setProp('task', name)
                .then(() => bot.say(`Great! I'll help you with ${task}`))
                .then(() => 'finish');
        }
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Hello again, ${name}!`))
                .then(() => 'finish');
        }
    }
});
