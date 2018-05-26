class DeclarationStatus{

    constructor(code){
        switch(code){
            case -1:
                console.log('ERROR, er is iets fout gegaan');
                break;

            case 0:
                console.log('NONE');
                break;

            case 1:
                console.log('VERZONDEN, De aangifte is verzonden, we wachten op antwoord');
                break;

            case 8:
                console.log('VERTREK_OK, Vertrek is goedgekeurd door de douane');
                break;

            case 13:
                console.log('GEANNULEERD, De zending is geannuleerd. De chauffeur mag niet gaan rijden.');
                break;

            case 18:
                console.log('GEEN_VRIJGAVE,  Douane geeft de zending niet vrij. De chauffeur mag niet gaan rijden.');
                break;

            case 22:
                console.log('CONTROLE, De douane wil de lading eerst controleren. De chauffeur mag niet gaan rijden.');
                break;

            case 25:
                console.log('LOSSEN_OK, De lading is vrijgegeven om te worden gelost.');
                break;

            case 36:
                console.log('VOORBEREID_INCOMPLEET, De aangifte is onderhande, maar niet niet volledig. De aangifte kan al wel ingepland worden, maar mag nog niet worden verstuurd.');
                break;

            case 37:
                console.log('VOORBEREID_COMPLEET, De aangifte staat klaar om verstuurd te worden.');
                break;
        }
    }
}
// public enum DeclarationStatus
// {
// 	ERROR = -1,                   // Er is iets fout gegaan
// 	NONE = 0,			
// 	VERZONDEN = 1,                // De aangifte is verzonden, we wachten op antwoord
// 	VERTREK_OK = 8, 			  // Vertrek is goedgekeurd door de douane
// 	GEANNULEERD = 13,             // De zending is geannuleerd. De chauffeur mag niet gaan rijden.
// 	GEEN_VRIJGAVE = 18,           // Douane geeft de zending niet vrij. De chauffeur mag niet gaan rijden.
// 	CONTROLE = 22,				  // De douane wil de lading eerst controleren. De chauffeur mag niet gaan rijden.
// 	LOSSEN_OK = 25,				  // De lading is vrijgegeven om te worden gelost.
// 	VOORBEREID_INCOMPLEET = 36,   // De aangifte is onderhande, maar niet niet volledig. De aangifte kan al wel ingepland worden, maar mag nog niet worden verstuurd.
// 	VOORBEREID_COMPLEET = 37,     // De aangifte staat klaar om verstuurd te worden.
// }