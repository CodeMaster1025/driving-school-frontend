import React, { FC } from "react";
import ModalWrapper from "@/components/other/ModalWrapper/ModalWrapper";
import ExitThin from "@/components/other/Icons/ExitThin";
import styles from "./ScheduleModal.module.scss";
import { GroupType } from "@/store/api/groups/groups.types";
import { schedulesApi } from "@/store/api/schedules/schedules.api";
import Select, { SelectTypes } from "@/components/UI/Select/Select";
import { ScheduleTypes } from "@/components/pages/Profile/Teacher/ScheduleModal/ScheduleModal.data";
import InputSecondary from "@/components/UI/Input/InputSecondary/InputSecondary";
import Button from "@/components/UI/Button/Button";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CreateScheduleType,
  ScheduleType
} from "@/store/api/schedules/schedules.types";
import ScheduleItem from "@/components/pages/Profile/Teacher/ScheduleItem/ScheduleItem";

interface Props {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  groups: GroupType[];
  schedules: ScheduleType[];
}

interface ScheduleCreateFields extends CreateScheduleType {
  groupId: number | "DEFAULT";
}

const ScheduleModal: FC<Props> = ({ isShow, setIsShow, groups, schedules }) => {
  const [createSchedule] = schedulesApi.useCreateScheduleMutation();

  const formSchema = Yup.object().shape({
    groupId: Yup.number().required("Выберите номер группы"),
    type: Yup.string().required("Выберите тип занятия"),
    startTime: Yup.string().required("Выберите начало занятия"),
    endTime: Yup.string().required("Выберите конец занятия"),
    date: Yup.string().required("Введите дату занятия")
  });
  const validationOpt = { resolver: yupResolver(formSchema) };

  const { handleSubmit, control, reset } =
    useForm<ScheduleCreateFields>(validationOpt);

  const onSubmit: SubmitHandler<ScheduleCreateFields> = (data) => {
    createSchedule({
      groupId: data.groupId,
      body: {
        type: data.type,
        startTime: data.startTime,
        endTime: data.endTime,
        date: data.date
      }
    }).then(() => reset());
  };

  return (
    <ModalWrapper
      className={styles.modal}
      isShow={isShow}
      setIsShow={setIsShow}
    >
      <header>
        <h3>Изменить расписание</h3>
        <button onClick={() => setIsShow(false)}>
          <ExitThin />
        </button>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.body}>
        <div className={styles.actions}>
          <div className={styles.selects}>
            <Controller
              name="groupId"
              defaultValue="DEFAULT"
              control={control}
              render={({ field }) => (
                <Select
                  title="Группа"
                  type={SelectTypes.Groups}
                  options={groups}
                  {...field}
                />
              )}
            />
            <Controller
              name="type"
              defaultValue="DEFAULT"
              control={control}
              render={({ field }) => (
                <Select
                  title="Тип урока"
                  type={SelectTypes.Schedule}
                  options={ScheduleTypes}
                  {...field}
                />
              )}
            />
          </div>
          <div className={styles.inputs}>
            <Controller
              name="startTime"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <InputSecondary title="Начало урока" type="time" {...field} />
              )}
            />
            <Controller
              name="endTime"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <InputSecondary title="Конец урока" type="time" {...field} />
              )}
            />
            <Controller
              name="date"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <InputSecondary title="Дата" {...field} type="date" />
              )}
            />
            <Controller
              name="address"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <InputSecondary title={"Адрес (опционально)"} {...field} />
              )}
            />
          </div>
        </div>
        <Button type="submit" primary>
          Добавить занятие
        </Button>
      </form>
      <div className={styles.schedule}>
        <h4>Расписание</h4>
        <ul>
          {schedules.map((schedule) => (
            <li key={schedule.id}>
              <ScheduleItem schedule={schedule} />
            </li>
          ))}
        </ul>
      </div>
    </ModalWrapper>
  );
};

export default ScheduleModal;
