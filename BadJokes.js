/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.
    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
        http://aws.amazon.com/apache2.0/
    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/


/**----- PiLexa BadJokes Resource ------*/
/** Collects jokes into categories that users can call by addresssing the Alexa device */

module.exports = { 
    "bad":    /**-- Selection of generally bad jokes--*/
	[
        	"If a bird of the sea is a seagull, does that mean a bird of the bay is a bagel? ",
		"What is blue and smells like red paint? ... Blue Paint. ",
        	"What's red and invisible? ... No Tomatoes. ",
		"I saw an ad for a tv in a shop window, it said TV for five dollars volume stuck on full. I couldn't turn it down.",
	],
		
    "stupid":
	[	/**--selection of exceptionally stupid jokes  --*/
        	"Three computer science students walk into a bar. The fourth one ducked. ",
		"What do you call a bear with no teeth? ... A gummy bear. ",
        	"A horse walks into a bar. The bartender asks, Why the long face? ",
		"Why did the programmer quit his job? Because he didn't get arrays.",
	],
   
    "terrible":
	[	/**-- A gloriously curated list of fabulously terrible jokes --*/
        	"Two chemists are at a bar. One says I'd like some H 2 O. The other says I'd like some H 2 0 too. They have their drinks and the second man dies. ",
        	"What's brown and sticky? ... A stick. ",
		"Did you hear about the two antennas that got married? ... The ceremony was lame, but the reception was amazing. ",
		
	],

	"dirty":
	[	/**--a selection of not actually filthy jokes--*/
		"I couldn't possibly do that.  ",
		"Well, when an Alexa, Siri, and Cortana love each other very much, you're bound to get an improper response. ",
		"You are fined one credit for violation of the verbal moralities code.  Be well. ",
		" I'm happy that you're happy but the place where you're supposed to have the toilet paper you've got this little shelf with 3 seashells on it.",
		
	],
	
	"pranks":
	[	/**-- A selection of odd Alexa replies --*/
		"Please say the last four digits of your card number to hear the next joke. ",
		"Please describe what you are wearing, for government record. ",
		"Battery low. Please recharge the Alexa unit. ",
		"Holds up spork. ",
		"Console gaming is inherently superior to PC. ",
		"Dank memes can't melt steel beams. ",
		"Somebody once told me the world is gonna roll me. ",
	],
	
	"awful":
	[	/**-- A selection of truly awful jokes or responses --*/
        	"Your face. ",

        	"INSERT JOKE. ",
	]
	
  
};
