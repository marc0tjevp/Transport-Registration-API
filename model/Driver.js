exports.driver = class Driver{
    
    constructor(Voornaam, Achternaam, Id){

        const assert = require('assert');

        assert(typeof (Voornaam) === 'string', 'Voornaam must be a string');
        assert(typeof (Achternaam) === 'string', 'Achternaam must be a string');
        assert(typeof (Id) === 'number', 'Id must be a number');

        this.Voornaam = Voornaam;
        this.Achternaam = Achternaam;
        this.Id = Id;
    }
}