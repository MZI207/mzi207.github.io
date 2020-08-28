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
    var commands = {
        education: function(){
            return '<p class="output"> { \
                        <br> &nbsp&nbsp"School" : "New York University"\
                        <br> &nbsp&nbsp"Major" : "Computer Science" \
                        <br> &nbsp&nbsp"Minor" : ["Math", "Economics", "Physics"] \
                        <br> &nbsp&nbsp"Graduation" : "May 2021" \
                        <br> } \
                    </p>'
        },
        hobbies: function(){
            return "<p class='output'>  </p>"
        },
        interests: function(){
            return "<p class='output'> In development </p>"
        },
        employment: function(){
            return '<p class="output"> {  \
                        <br> &nbsp&nbsp"August 2016 - Present" : "SHSAT Department Manager @ Khans Tutorial " \
                        <br> } \
                    </p>'
        },
        contact: function(){
            return '<p class="output">  \
                        [ <a href="mailto: mzi207@nyu.edu" target="_blank"> "mzi207@nyu.edu" </a>, \
                        <a href="https://www.linkedin.com/in/mohammed-iqbal-b26ba214b/" target="_blank"> "Mohammed Iqbal" </a>] \
                    </p>'
        },
        languages: function(){
            return '<p class="output">[ "Python", "C++", "Java", "JavaScript", "Haskell", "Verilog", "LaTex", "C", "HTML/CSS"]  </p>'
        },
        programs:function(){
            return '<p class="output">[ "Emacs", "Github", "Flask", "Adobe Photoshop Lightroom", "Lab-View", "Auto-CAD"]  </p>'
        },
        hi: function(){
          return "<p class='output'> Welcome! </p>"
        },
        help: function(){
            return "<p class='output'> Here are a list of commands and what they do: \
                    <br> &nbsp&nbsphi -- The terminal will greet you\
                    <br> &nbsp&nbspeducation -- List the educational institutions attended \
                    <br> &nbsp&nbsphobbies -- List my hobbies\
                    <br> &nbsp&nbspinterests -- List my interests\
                    <br> &nbsp&nbspemployment -- List my employment\
                    <br> &nbsp&nbspcontact -- List my contact information and ways to reach me\
                    <br> &nbsp&nbsplanguages -- List the programming languages that I am experienced with\
                    <br> &nbsp&nbspprograms -- List the programs that I have experience with\
                    </p>"
        },
        command_not_found(){
            return "<p class='output'> Command not found. Type 'help' for a list of commands.</p>"
        }
    }
    self.init = function(elem){
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
                else{
                    run(elem, "command_not_found", "command_not_found");
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
