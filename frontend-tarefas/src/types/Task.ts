export type Task = {
  id: number;
  title: string;
  status: 'pendente' | 'em_progresso' | 'concluido';
  category?: string;
  created_at: string;
};