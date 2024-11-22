interface IProdotto {
    tipo: string; // costume da bagno, pareo, cappello
    id: string | number; // Id prodotto
    taglia: string | number; 
    colore: string; 
    stato: "disponibile" | "esaurito";
    assegnaCliente(cliente: ICliente): void;
}

interface ICliente {
    nome: string;
    cognome: string;
    email: string;
    metodoPagamentoPreferito: string;
    ordinaProdotto(prodotto: IProdotto): void;
}

interface IProcessoProduzione {
    nomeProcesso: string; // Processo di produzione
    descrizione: string;
    prodottiInProduzione: IProdotto[]; // Array dei prodotti attualmente in produzione
    aggiungiProdotto(prodotto: IProdotto): void;
}

class Prodotto implements IProdotto {
    tipo: string;
    id: string | number;
    taglia: string | number;
    colore: string;
    stato: "disponibile" | "esaurito";
    cliente?: ICliente; // Opzionale

    constructor(tipo: string, id: string | number, taglia: string | number, colore: string) {
        this.tipo = tipo;
        this.id = id;
        this.taglia = taglia;
        this.colore = colore;
        this.stato = "disponibile"; // I nuovi prodotti sono disponibili di default
    }

    assegnaCliente(cliente: ICliente): void {
        if (this.stato === "disponibile") {
            this.cliente = cliente;
            this.stato = "esaurito";
            console.log(`Il prodotto ${this.tipo} è stato ordinato da ${cliente.nome} ${cliente.cognome} attraverso ${cliente.metodoPagamentoPreferito}.`);
        } else {
            console.log(`Spiacenti, il prodotto ${this.tipo} non è più disponibile.`);
        }
    }
}

class Cliente implements ICliente {
    nome: string;
    cognome: string;
    email: string;
    metodoPagamentoPreferito: string;

    constructor(nome: string, cognome: string, email: string, metodoPagamentoPreferito: string) {
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.metodoPagamentoPreferito = metodoPagamentoPreferito;
    }

    ordinaProdotto(prodotto: IProdotto): void {
        prodotto.assegnaCliente(this);
    }
}

class ProcessoProduzione implements IProcessoProduzione {
    nomeProcesso: string;
    descrizione: string;
    prodottiInProduzione: IProdotto[];

    constructor(nomeProcesso: string, descrizione: string) {
        this.nomeProcesso = nomeProcesso;
        this.descrizione = descrizione;
        this.prodottiInProduzione = []; // array vuoto che conterrà i prodotti appena creati
    }

    aggiungiProdotto(prodotto: IProdotto): void {
        this.prodottiInProduzione.push(prodotto);
        console.log(`Il prodotto ${prodotto.tipo} è stato aggiunto al processo di produzione "${this.nomeProcesso}".`);
    }
}

// Creazione dei prodotti
const costume = new Prodotto("costume da bagno", 1234, "M", "rosso");
const pareo = new Prodotto("pareo", 5678, "S", "nero");
const cappello = new Prodotto("cappello", 9101112, "taglia unica", "neutro");

// Creazione di alcuni clienti
const cliente1 = new Cliente("Marta", "Rossi", "marta.rossi@test.com", "Klarna");
const cliente2 = new Cliente("Paolo", "Bianchi", "paolo.bianchi@test.com", "PayPal");

// Creazione del processo di produzione
const produzione = new ProcessoProduzione("PlasticSeaFree by Sunnee©", "Tutti i nostri prodotti sono realizzati con un materiale brevettato che viene realizzato a partire dai rifiuti in plastica dei mari");

// Aggiunta dei prodotti al processo di produzione
produzione.aggiungiProdotto(costume);
produzione.aggiungiProdotto(pareo);
produzione.aggiungiProdotto(cappello);

// Simulazione di ordini
cliente1.ordinaProdotto(costume); // Marta ordina un costume
cliente2.ordinaProdotto(cappello); // Paolo ordina un cappello

// Marta prova ad ordinare un altro cappello
cliente1.ordinaProdotto(cappello); // Il prodotto cappello non è più disponibile

// Aggiunta di un nuovo prodotto al processo di produzione e ordine di quest'ultimo
const infradito = new Prodotto("Infradito", 13141516, 41, "blu");
produzione.aggiungiProdotto(infradito);
cliente2.ordinaProdotto(infradito); // Paolo ordina il costume blu