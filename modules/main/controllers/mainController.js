angular
.module('app')
.controller('mainController', mainController);

function mainController($scope, $timeout){

    var artyom = new Artyom();

    // alert("hello")
    var jarvis = new ElizaBot(true);
    $scope.messages = []
    $scope.volume = 'volume_off';
    $scope.volumeColor = '#3F51B5';
    $scope.speaking = false;
    
    function reset(){
        $scope.volume = 'volume_off';
        $scope.volumeColor = '#3F51B5';
        $scope.speaking = false;

        artyom.addCommands(commandHello)
    }
    
    // var commands = {
    //     'hello': function(words) {
    //         console.log('USER:', words);
    //         annyang.pause();
    //         $timeout(function(){
    //             $scope.volume = 'volume_up';
    //             $scope.volumeColor = '#D32F2F';
    //             $scope.speaking = true;
    //             var reply = jarvis.transform(words); 
    //             speak.play(reply, {}, function(){
    //                 $timeout(reset);
    //                 reset();
    //             });
    //             console.log('JARVIS:', reply);
    //         });
    //     },
    // };

    // Add our commands to annyan
    // annyang.addCommands(commands);

    // Start listening. You can call this here, or attach this call to an event, button, etc.
    // console.log(annyang);
    // annyang.start();
    // console.log(annyang);

    commandHello = {
        indexes:["*"], // These spoken words will trigger the execution of the command
        smart:true,
        action:function(i,words){ // Action to be executed when a index match with spoken word
            $timeout(function(){
                artyom.dontObey();
                artyom.dontObey();

                $scope.volume = 'volume_up';
                $scope.volumeColor = '#D32F2F';
                $scope.speaking = true;
                var reply = jarvis.transform(words);

                $scope.reverse = function (arr) {
                    return arr.reverse()
                } 

                console.log('User:', words);
                $scope.messages.push({message: 'You: '+ words})
                artyom.say(reply, {
                    onStart: function() {
                        artyom.dontObey();
                        console.log('Juana:', reply);
                        $scope.messages.push({message: 'Juana: '+ reply})
                    },
                    onEnd:function() {
                        $timeout(reset);
                        reset();
                        artyom.dontObey();

                        artyom.obey();
                    }
                });
                // speak.play(reply, {}, function(){
                //     $timeout(reset);
                //     reset();
                // });
                
            });
            
        }
    }
    artyom.addCommands(commandHello)
    artyom.fatality();// use this to stop any of

    setTimeout(function(){// if you use artyom.fatality , wait 250 ms to initialize again.
         artyom.initialize({
            lang:"en-US",// A lot of languages are supported. Read the docs !
            continuous:true,// Artyom will listen forever
            listen:true, // Start recognizing
            debug:false, // Show everything in the console
            speed:1 // talk normally
        }).then(function(){
            console.log("Ready to work !");
        });
    },250)

    $scope.msg = '';
    $scope.send = function (words) {
        artyom.dontObey();
        artyom.dontObey();

        $scope.volume = 'volume_up';
        $scope.volumeColor = '#D32F2F';
        $scope.speaking = true;
        var reply = jarvis.transform(words);

        console.log('User:', words);
        $scope.messages.push({message: 'You: '+ words})
        artyom.say(reply, {
            onStart: function() {
                artyom.dontObey();
                console.log('Juana:', reply);
                $scope.messages.push({message: 'Juana: '+ reply})
                $scope.msg = '';
            },
            onEnd:function() {
                $timeout(reset);
                reset();
                artyom.dontObey();

                artyom.obey();
            }
        });
    };
}