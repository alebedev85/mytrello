import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateTask } from "../../store/boardSlice";
import { Task } from "../../types";
import FormInput from "../ui/FormInput/FormInput";
import FormTextarea from "../ui/FormTextarea/FormTextarea";
import styles from "./TaskEditingForm.module.scss";

interface TaskEditingFormProps {
  task: Task;
  onClose: () => void;
}

type TEditForm = Pick<Task, "title" | "description">;

const TaskEditingForm = ({ task, onClose }: TaskEditingFormProps) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TEditForm>({
    defaultValues: {
      title: task.title,
      description: task.description,
    },
  });

  const onSubmit = ({ title, description }: TEditForm) => {
    if (title.trim()) {
      dispatch(
        updateTask({
          ...task,
          title: title,
          description: description,
        }),
      );
      onClose();
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
      <div className={styles.formControls}>
        <button className={styles.button} type="submit">
          <p className="text-body">Сохранить</p>
        </button>
        <button onClick={onClose} className={styles.button} type="button">
          <p className="text-body">Отмена</p>
        </button>
      </div>
    </form>
  );
};

export default TaskEditingForm;
