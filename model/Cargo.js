var cargo = class Cargo {

    constructor(Mrn, Status, Reference, DateTime, Afzender, Ontvanger, Opdrachtgever,
                AantalArtikelen, Totaalbedrag, Currency, TotaalGewicht){
                    this.Mrn = Mrn
                    this.Status = Status
                    this.Reference = Reference
                    this.DateTime = DateTime
                    this.Afzender = Afzender
                    this.Ontvanger = Ontvanger
                    this.Opdrachtgever = Opdrachtgever
                    this.AantalArtikelen  = AantalArtikelen
                    this.Totaalbedrag = Totaalbedrag
                    this.Currency = Currency
                    this.TotaalGewicht = TotaalGewicht                       
                }
}

module.exports.cargo = cargo;

// public class Declaration
// {
// 	public string Mrn;
// 	public DeclarationStatus Status;
// 	public string Reference;
// 	public DateTime DateTime;	
// 	public string Afzender;
// 	public string Ontvanger;
// 	public string Opdrachtgever;
// 	public int AantalArtikelen;
// 	public decimal TotaalBedrag;
// 	public string Currency;
// 	public decimal TotaalGewicht;
// }