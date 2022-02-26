export interface Chamado {
    id?:             any;
    dataAbertura?:   String;
    dataFechamento?: String;
    prioridade:      String;
    status:          String;
    titulo:          String;
    observacoes:     String;
    tecnico:         any;
    cliente:         any;
    nomeCliente:     String;
    nomeTecnico:     String;
}