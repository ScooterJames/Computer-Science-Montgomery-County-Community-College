/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.
    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
        http://aws.amazon.com/apache2.0/
    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/** code inspired and adapted from per4mnce/mama-jokes */


'use strict';

var AlexaSkill = require('./AlexaSkill'),
    jokes = require('./data');
																			// DO THIS \/
var APP_ID = 'amzn1.echo-sdk-ams.app.2abbf8ec-05e3-49d1-b097-144663b180f7'; //replace with 'amzn1.echo-sdk-ams.app.[your-unique-value-here]';

var jokeCategories  = "bad, stupid, terrible, dirty, pranks, awful";  //types of jokes alexa will tell

/**
 * BadJokes is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var BadJokes = function () 
{
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
BadJokes.prototype = Object.create(AlexaSkill.prototype);
BadJokes.prototype.constructor = BadJokes;

BadJokes.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) 
{
    var speechText = "I would love to tell you some truly spectacular jokes. Ask me to tell you a joke from the following categories..." +  
                     jokeCategories + "... Which type would you like to hear?";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "For instructions on giving me instructions, please say help me.";
    response.ask(speechText, repromptText);
};

BadJokes.prototype.intentHandlers = {
    "JokeIntent": function (intent, session, response) {
        var itemSlot = intent.slots.Item,
            categoryName;
        if (itemSlot && itemSlot.value){
            categoryName = itemSlot.value.toLowerCase();
        }

        var cardTitle,
            joke,
            jokeIndex,
            repromptOutput,
            speechOutput;
        
        //Select a randon category if one is not provided
        if (categoryName === undefined) {
            var categoryArray = jokeCategories.split(', ');
            var categoryIndex = getRandomInt(0, categoryArray.length - 1);
            categoryName = categoryArray[categoryIndex];
        } 
        
        //Lookup joke and cardTitle only when category is valid
        if (isValidCategory(categoryName)) {
            jokeIndex = getRandomInt(0, jokes[categoryName].length - 1),
            joke = jokes[categoryName][jokeIndex];
            cardTitle = "Joke for category: " + categoryName
        }        
        if (joke) {
            speechOutput = {
                //speech: "<speak>" + joke + "<audio src='https://s3.amazonaws.com/sounds226/boom.mp3'/></speak>",
                speech: "<speak>" + joke + "<audio src='https://s3.amazonaws.com/sounds226/" + rndSound() + "'/></speak>",
                type: AlexaSkill.speechOutputType.SSML
            };
            response.tellWithCard(speechOutput, cardTitle, joke);
        } else {
            var speech;
            if (categoryName) {
                speech = "I don't know any " + categoryName + " jokes. "
                         +"Please choose from the following types... " + jokeCategories;
            } else {
                speech = "I'm sorry, I don't know any jokes like that. "
                         +"Pick a joke style from the following types... " + jokeCategories;
            }
            speechOutput = {
                speech: speech,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            repromptOutput = {
                speech: "Is there something else I can help with?",
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.ask(speechOutput, repromptOutput);
        }
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        var speechText = "You could ask a question, like tell me a joke about..." + 
            "The categories include: " + jokeCategories + 
            "... When you're finished, you can say exit... What can I do for you?";
        var repromptText = "You can say things like, tell me a joke about pranks, or you can choose to exit... What can I do for you?";
        var speechOutput = {
            speech: speechText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        var repromptOutput = {
            speech: repromptText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.ask(speechOutput, repromptOutput);
    }
};

exports.handler = function (event, context) {
    var BadJokes = new BadJokes();
    BadJokes.execute(event, context);
};


//Returns a random integer between min (inclusive) and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Returns a random sound file name
function rndSound() {
    var fileNames = ['NyukNyuk.mp3', 'boom.mp3', 'laugh1.mp3', 'laugh2.mp3', 'laugh3.mp3', 'laugh4.mp3'];
    return(fileNames[getRandomInt(0, fileNames.length - 1)]);
}

//Determine if an item is in the category list
function isValidCategory(txt) {
    var found = true;
    if (jokeCategories.indexOf(txt) === -1) {
        found = false;
    }
  return found;
};
