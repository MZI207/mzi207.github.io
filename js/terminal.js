//--- Terminal ---
var Terminal= (function(){
    var history = [],
    historyIndex = history.length;
    self = {};
    if (localStorage.getItem("history")){
        history = localStorage.getItem("history").split(",");
    }
    else{
        history = [];
    }
    var UP = 38, DOWN = 40;
    
    var resetPrompt = function(terminal, prompt){
        var newPrompt = prompt.parentNode.cloneNode(true);
        prompt.setAttribute("contenteditable", false);
        if (self.prompt){
            newPrompt.querySelector(".prompt").textContent = self.prompt;
        }
        terminal.appendChild(newPrompt);
        newPrompt.querySelector(".input").innerHTML = " ";
        newPrompt.querySelector(".input").focus();
    };

    var run = function(terminal, command, args){
        terminal.innerHTML += (self.commands[command](args));
    };

    var update = function(command){
        history.push(command);
        localStorage.setItem("history", history);
        historyIndex = history.length;
    };

    var browse = function(prompt,direction){
        var change = false;
        if (direction == UP && historyIndex > 0){
            prompt.textContent = history[--historyIndex];
            change = true;
        }
        else if( direction == DOWN){
            if (historyIndex < history.length){
                historyIndex++;
                prompt.textContent = history[historyIndex];
            }
            else{
                prompt.textContent = " ";
                change = true;
            }
        }
        if (change){
            var range = document.createRange();
            var selection = window.getSelection();
            range.setStart(prompt.childNodes[0], prompt.textContent.length);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };

    self.init = function(elem, commands){
        self.commands = commands;
        elem.addEventListener("keyup", function(event){
            if (historyIndex >= 0){
                browse(event.target, event.keyCode);
            }
        });
        elem.addEventListener("keypress", function(event){
            var prompt = event.target;
            if (event.keyCode == 13){
                update(prompt.textContent);
                var input = prompt.textContent.split(" ");
                if (input[0] in self.commands){
                    run(elem, input[0], input);
                }
                resetPrompt(elem, prompt);
                event.preventDefault();
            }
        });
        elem.querySelector(".input").focus();
        return self;
    };
    return self;
})();
