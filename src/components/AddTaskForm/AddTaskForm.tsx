import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTask } from "../../store/boardSlice";
import { Task } from "../../types";
import CustomSelect from "../ui/CustomSelect/CustomSelect";
import FormInput from "../ui/FormInput/FormInput";
import FormTextarea from "../ui/FormTextarea/FormTextarea";

import styles from "./AddTaskForm.module.scss";

interface AddTaskFormProps {
  isActive: boolean;
  columnId: string;
  onClose: () => void;
}

type TNewTask = Pick<Task, "title" | "description" | "priority">;

const AddTaskForm = ({ isActive, columnId, onClose }: AddTaskFormProps) => {
  const dispatch = useDispatch();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TNewTask>({
    defaultValues: {
      priority: "none",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = ({ title, description, priority }: TNewTask) => {
    if (title.trim()) {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: title,
        description: description,
        priority: priority,
      };
      dispatch(addTask({ columnId, task: newTask }));
      reset();
      onClose();
    }
  };
  return isActive ? (
    <form className={styles.taskForm} onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        id="title"
        type="text"
        placeholder="Заголовок задачи"
        error={errors.title?.message}
        registerProps={register("title", {
          required: "Заголовок обязателен",
        })}
      />
      <FormTextarea
        id="description"
        placeholder="Описание задачи"
        registerProps={register("description")}
      />
      <div className={styles.priority}>
        <p className="text-body">Приоритет:</p>
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <CustomSelect value={field.value} onChange={field.onChange} />
          )}
        />
      </div>
      <div className={styles.formControls}>
        <button type="submit" className={styles.button}>
          <p className="text-body">Добавить</p>
        </button>
        <button type="button" onClick={handleClose} className={styles.button}>
          <p className="text-body">Отмена</p>
        </button>
      </div>
    </form>
  ) : null;
};

export default AddTaskForm;
