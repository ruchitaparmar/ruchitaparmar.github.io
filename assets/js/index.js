var shell = $('.shell').resizable({
    minHeight: 128,
    minWidth: 400   
}).draggable({
    handle: '> .status-bar .title'
});
var fs = {
    children: {
        'aboutMe': {
            children: {
                'aboutMe.txt': {
                    path: './projects/aboutMe.txt'
                },
                'quotesILove.txt': {
                    path: './projects/quotesILove.txt'
                }
            }
        }//,
        //'foo.txt': {path: './foo.txt'},
        //'bar.txt': {path: './bar.txt'}
    }
};

var path = [];
var cwd = fs;

$(function() {
    $("#terminal > div > div.content.terminal > div.terminal-wrapper > div.terminal-output").find("div").remove();
});


function restore_cwd(fs, path) {
    path = path.slice();
    while (p.length) {
        var dir_name = p.shift();
        if (!fs[dir_name].children) {
            throw new Error('Internal Error Invalid directory ' +
                            $.terminal.escape_brackets(dir_name));
        }
        fs = fs[dir_name];
    }
    return fs;
}
function is_dir(obj) {
    return !!(obj && obj.children);
}
function is_file(obj) {
    return !!obj && typeof obj.path === 'string';
}
var commands = {
   
  /*  cd: function(dir) {
        if (dir === '..') {
            if (!path.length) {
                path.pop(); // remove from end
                cwd = restore_cwd(fs, path);
            }
        } else if (!is_dir(cwd.children[dir])) {
            this.error($.terminal.escape_brackets(dir) + ' is not a directory');
        } else {
            cwd = cwd.children[dir];
            path.push(dir);
        }
    },
    ls: function() {
        if (!cwd.children) {
            throw new Error('Internal Error Invalid directory');
        }
        var dir = Object.keys(cwd.children).map(function(key) {
            if (is_dir(cwd.children[key])) {
                return key + '/';
            }
            return key;
        });
        this.echo(dir.join('\n'));
    },
    cat: function(file) {
        if (!is_file(cwd.children[file])) {
            this.error($.terminal.escape_brackets(file) + " does not exist");
        } else {
            $.get(cwd.children[file].path, this.echo).fail(() => {
                this.error("AJAX error can't find the file " + file);
            });
        }
    }, */

    /* ❍ ○ */
    help: function() {
        this.echo('Available commands: ' + '\n' + Object.keys(commands).join('\n'));
    },
    hello: function() {
        this.echo('Hello to you too!');
    },
    about: function() {
        this.echo('\n' + 
                  '• In June 2019, I completed my undergrad in CS from University of Mumbai, India.' + '\n' +
                  '• Currently, I am in my first year of MS in HCI at Georgia Tech, USA.' + '\n' +
                  '• My Chinese name is 卡拉 (Kǎlā or Kara or Carla)' + '\n' +
                  '• I am huge Potterhead. On Pottermore, I was sorted into the Gryffindor house.' + '\n' + 
                  '• My Patronus is a Tonkinese Cat. ' + '\n' +
                  '• My favourite authors are Agatha Christie, Jeffrey Archer and Khaled Hosseini.' + '\n' +
                  '• Out of the 16 personality types, mine is The Adventurer (ISFP-A).' + '\n' + 
                  '• One of my newly found favourite words is charrette.' + '\n' +
                  '• I like all shades of Purple and Violet, especially this #340049.' + '\n');  
    }

};







var term = $('.content').terminal(commands, {
    prompt: prompt(),
    completion: function(string, callback) {
        var command = this.get_command();
        var cmd = $.terminal.parse_command(command);
        if (cmd.name === 'ls') {
            callback([]);
        } else if (cmd.name === 'cd') {
            var dirs = Object.keys(cwd.children).filter(function(key) {
                return is_dir(cwd.children[key]);
            });
            callback(dirs);
        } else if (cmd.name === 'cat') {
            var files = Object.keys(cwd.children).filter(function(key) {
                return is_file(cwd.children[key]);
            });
            callback(files);
        } else {
            callback(Object.keys(commands));
        }
    },
    // detect iframe codepen preview
/*    enabled: $('body').attr('onload') === undefined,*/
});
// for codepen preview
/*if (!term.enabled()) {
    term.find('.cursor').addClass('blink');
}
*/function prompt(type) {
    return function(callback) {
        var prompt;
        if (type === 'windows') {
            prompt = 'C:\\' + path.join('\\') + '> ';
        } else {
            prompt = 'user@host:/' + path.join('/') + '$ ';
        }
        $('.title').html(prompt);
        callback(prompt);
    };
}
$('#type').on('change', function() {
    shell.removeClass('osx windows ubuntu default custom').addClass(this.value);
    term.toggleClass('underline-animation', this.value == 'windows');
    term.set_prompt(prompt(this.value));
});
$('#light').on('change', function() {
    shell.removeClass('dark light');
    if (this.checked) {
        shell.addClass('light');
    } else {
        shell.addClass('light');
    }
});
$('#type, #light').on('change', function() {
    setTimeout(function() {
        term.focus();
    }, 400)
});
