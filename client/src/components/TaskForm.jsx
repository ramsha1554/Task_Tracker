import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import Input from './Input';

const defaultValues = {
  title: '',
  description: '',
  priority: 'med',
  status: 'todo',
  dueDate: '',
};

export default function TaskForm({ open, onClose, onSubmit, editTask }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues });

  useEffect(() => {
    if (editTask) {
      reset({
        title: editTask.title,
        description: editTask.description || '',
        priority: editTask.priority,
        status: editTask.status,
        dueDate: editTask.dueDate
          ? new Date(editTask.dueDate).toISOString().split('T')[0]
          : '',
      });
    } else {
      reset(defaultValues);
    }
  }, [editTask, reset]);

  const submit = async (data) => {
    await onSubmit(data);
    reset(defaultValues);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="border border-mid rounded p-4 mb-6"
          style={{ backgroundColor: 'var(--color-paper)' }}
        >
          <h2 className="text-sm font-medium text-ink mb-4">
            {editTask ? 'Edit task' : 'New task'}
          </h2>

          <form onSubmit={handleSubmit(submit)} noValidate>
            <div className="flex flex-col gap-3">
              <Input
                label="Title"
                placeholder="What needs to be done?"
                error={errors.title?.message}
                {...register('title', { required: 'Title is required' })}
              />

              <Input
                label="Description"
                placeholder="Add some context (optional)"
                {...register('description')}
              />

              <div className="flex gap-3">
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm font-medium text-ink">Priority</label>
                  <select
                    className="w-full px-3 py-2 text-sm bg-paper border border-mid rounded outline-none focus:border-ink"
                    {...register('priority')}
                  >
                    <option value="low">Low</option>
                    <option value="med">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm font-medium text-ink">Status</label>
                  <select
                    className="w-full px-3 py-2 text-sm bg-paper border border-mid rounded outline-none focus:border-ink"
                    {...register('status')}
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm font-medium text-ink">Due date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 text-sm bg-paper border border-mid rounded outline-none focus:border-ink"
                    {...register('dueDate')}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : editTask ? 'Save changes' : 'Add task'}
                </Button>
                <Button variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}