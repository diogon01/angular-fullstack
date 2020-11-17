export enum TipoAtendimento {
    MANUTENCAO = 'MANUTENCAO',
    DESENVOLVIMENTO = 'DESENVOLVIMENTO',
    DOCUMENTACAO = 'DOCUMENTACAO'
}
export enum PrioridadeAtendimento {
    NORMAL = 'NORMAL',
    URGENTE = 'URGENTE'
}
// TODO: Replace this with your own data model type
export interface Atividade {
    nome: string;
    id: number;
    tipo: TipoAtendimento,
    prioridade: PrioridadeAtendimento,
    descricao: string,
    data_realizacao: string
}