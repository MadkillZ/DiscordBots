const Discord = require('discord.js');
const { exit } = require('process');
const client = new Discord.Client()
const prefix = '&';
var start = false;
var arr = [];
var num = 0;

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
})

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot )
        return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (command === 'new'){ //This is where new game is created
        message.channel.send('Creating new custom, please &join');
        start = true;
        while (arr.length > 0) {
            arr.pop();
        } 
        num=0;
    }
    else if (command === 'join'){ // Opt into the game
            if (!start){
                message.channel.send("Please use &new first"); 
            }
            else{
                var test = false;
                for (var i=0;i<arr.length;i++){
                    if(message.author.toString()==arr[i]){
                        message.channel.send("Already in lobby");
                        test = true;  
                    }
                }
                if (test == false){
                    num++;
                    message.channel.send("People in lobby: " + num);
                    arr.push(message.author.toString());
                }
            }
        }
    else if(command === 'start'){ //This randomizes and starts the game
        if (num>=4){
            shuffle(arr);
            message.channel.send("Team 1:");
            //console.log(arr.length/2);
            for (var i=0;i<(arr.length);i++){
                if (i==Math.round(arr.length/2)){
                    message.channel.send("Team 2:");
                    //message.channel.send(arr[i]);  
                }
                message.channel.send(arr[i]);
            }
        }
        else{
            message.channel.send("Need to be atleast 4 people");  
        }
    }
    else if(command === 'leave'){ // Removes yourself from the game
        if (num==0){
            message.channel.send("Nobody in the list");
        }
        else if(num>0){
            for (var i=0;i<(arr.length);i++){
                if (arr[i]==message.author.toString()){
                    var removed = arr.splice(i,1);
                    message.channel.send(removed + " left the game");
                    num--;
                    message.channel.send("People in lobby: " + num);
                }
            }
        }
    }
    else if(command === 'help'){ //classic help
        message.channel.send("This is the team randomizer bot. You need to make a &new lobby and then people can &join on it. If everybody joined you can &start the game (which randomizes the people that joined into 2 seperate teams)");
        message.channel.send("&new : Is to create a new game");
        message.channel.send("&join : This is to opt in for the game");
        message.channel.send("&leave : This takes you out of the queue");
        message.channel.send("&start : This randomizes the teams and outputs it");  
    }
});

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"
bot_secret_token = "ODA0NjY0NDg4OTg4Mzc3MTE5.YBPoNA.LwXJJ8bAnNHvkaKmGM-Pzx1hlis"

client.login(bot_secret_token)

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }