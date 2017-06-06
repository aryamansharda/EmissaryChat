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
        prompt: (bot) => bot.say("How can I help you today? \n 1) New Appointment (NA) \n 2) Cancel Appointment (CA) \n 3) Reschedule Appointment (RA) \n 4) Live Chat (LC)"),
        receive: (bot, message) => {
            const task = message.text;
            switch(task) {        
                case "NA":
                    return bot.setProp('task', task)
                        .then(() => bot.say(`Great! I'll help you create an appointment.`))
                        .then(() => 'finish');
                    break;
                case "CA":
                    return bot.setProp('task', task)
                                    .then(() => bot.say(`Great! I'll help you cancel an appointment`))
                                    .then(() => bot.say(`What time/day would you like to create an appointment for? (MM/DD/YYYY 24:00)`))
                                    .then(() => console.log("New appointment created.")
                                    .then(() => 'finish');
                    break;
                case "RA":
                    return bot.setProp('task', task)
                                    .then(() => bot.say(`Great! I'll help you reschedule an appointment`))
                                    .then(() => bot.say(`Which of the following appointments do you want to cancel?'))
                                    .then(() => 'finish');
                    break;
                case "LC":
                    return bot.setProp('task', task)
                                    .then(() => bot.say(`Great! I'll go fetch a Emissary representative`))
                                    .then(() => bot.say(`Which of the following appointments do you want to reschedule?'))
                                    .then(() => 'finish');
                    break;
                default:
                    return bot.setProp('task', task)
                                    .then(() => bot.say(`An error occurred`))
                                    .then(() => 'finish');
                }            
        }
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Hello again, ${name}!`))
                .then(() => 'howToHelp');
        }
    }
});