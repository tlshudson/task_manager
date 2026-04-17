import { useState } from 'react';
import type { FormEvent } from 'react';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';

interface TaskFormProps {
  onAdd: (title: string, description?: string) => Promise<void>;
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('O título da tarefa é obrigatório.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      await onAdd(title, description);
      setTitle('');
      setDescription('');
    } catch (err: any) {
      setError(err.message || 'Erro ao criar tarefa');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 md:items-start">
        <div className="flex-1 space-y-4">
          <Input
            placeholder="O que você precisa fazer?"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError(null);
            }}
            error={error || undefined}
            autoFocus
          />
          <Input
            placeholder="Descrição (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="md:mt-0 h-[46px] w-full md:w-auto"
        >
          Adicionar
        </Button>
      </div>
    </form>
  );
}
