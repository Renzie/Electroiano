/**
 * Created by Renzie on 5/12/2017.
 */

function WhiteKey(name) {
    this.name = name;

}


function BlackKey(name) {
    this.name = name;
}
function PianoField() {
    this.whitekeys = ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'];
    this.blackkeys = ['do', 're', 'fa', 'sol', 'la'];

    this.keys = [];
}

PianoField.prototype.FillKeys = function () {
    for (let i = 0; i < this.whitekeys.length + this.blackkeys.length; i++){
        keys.
    }
}

function Piano() {
    this.field = new PianoField();


    for (let i = 0; i < whitekeys.length; i++) {
        this.
    }

}





module.exports = Piano;