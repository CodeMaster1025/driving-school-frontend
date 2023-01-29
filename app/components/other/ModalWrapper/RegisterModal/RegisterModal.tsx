import React, { FC } from "react";
import ExitThin from "@/components/other/Icons/ExitThin";
import InputPrimary from "@/components/ui/Input/InputPrimary/InputPrimary";
import Button from "@/components/ui/Button/Button";
import styles from "./RegisterModal.module.scss";
import Link from "next/link";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm, Controller } from "react-hook-form";

interface Props {
  setModalType: React.Dispatch<React.SetStateAction<"login" | "register">>;
  setIsModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

interface RegisterFields {
  fio: string;
  phone: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const RegisterModal: FC<Props> = ({ setIsModalShow, setModalType }) => {
  const formSchema = Yup.object().shape({
    fio: Yup.string()
      .required("Введите ваше ФИО")
      .matches(
        /^[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{0,}\s[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,}(\s[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,})?$/,
        "Введите корректное ФИО"
      ),
    phone: Yup.string()
      .required("Введите номер вашего телефона")
      .matches(
        /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}$/,
        "Введите корректный номер телефона"
      ),
    email: Yup.string()
      .required("Введите ваш E-mail адрес")
      .matches(
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        "Введите валидный E-mail"
      ),
    password: Yup.string()
      .required("Введите пароль")
      .min(8, "Пароль должен содержать минимум 8 символов"),
    repeatPassword: Yup.string()
      .required("Подтвердите пароль")
      .oneOf([Yup.ref("password")], "Пароли не совпадают")
  });
  const validationOpt = { resolver: yupResolver(formSchema) };

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<RegisterFields>(validationOpt);

  const onSubmit: SubmitHandler<RegisterFields> = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.register}>
      <div className={styles.top}>
        <h4>Регистрация</h4>
        <button onClick={() => setIsModalShow(false)}>
          <ExitThin />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.primary}>
        <Controller
          name="fio"
          control={control}
          render={({ field }) => (
            <InputPrimary title="ФИО" error={errors.fio?.message} {...field} />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <InputPrimary
              type="tel"
              title="Номер телефона"
              error={errors.phone?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputPrimary
              type="email"
              title="Эл. почта"
              error={errors.email?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputPrimary
              type="password"
              title="Пароль"
              error={errors.password?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="repeatPassword"
          control={control}
          render={({ field }) => (
            <InputPrimary
              type="password"
              title="Подтвердите пароль"
              error={errors.repeatPassword?.message}
              {...field}
            />
          )}
        />
        <Button type="submit" className={styles.register} primary>
          Зарегистрироваться
        </Button>
      </form>
      <div className={styles.footer}>
        <p>
          Уже есть аккаунт?{" "}
          <button onClick={() => setModalType("login")}>Авторизуйтесь</button>
        </p>
        <p className={styles.info}>
          Ввод данных подтверждает ваше согласие с{" "}
          <Link href={"/"}>политикой конфиденциальности</Link> и{" "}
          <Link href={"/"}>обработкой персональных данных</Link>.
        </p>
      </div>
    </div>
  );
};

export default RegisterModal;
