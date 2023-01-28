import React, { FC } from "react";
import ExitThin from "@/components/other/Icons/ExitThin";
import InputPrimary from "@/components/ui/Input/InputPrimary/InputPrimary";
import Button from "@/components/ui/Button/Button";
import styles from "./RegisterModal.module.scss";
import Link from "next/link";

interface Props {
  setModalType: React.Dispatch<React.SetStateAction<"login" | "register">>;
  setIsModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterModal: FC<Props> = ({ setIsModalShow, setModalType }) => {
  return (
    <div className={styles.register}>
      <div className={styles.top}>
        <h4>Регистрация</h4>
        <button onClick={() => setIsModalShow(false)}>
          <ExitThin />
        </button>
      </div>
      <form className={styles.primary}>
        <InputPrimary
          title="ФИО"
        />
        <InputPrimary
          type="tel"
          title="Номер телефона"
        />
        <InputPrimary
          type="email"
          title="Эл. почта"
        />
        <InputPrimary
          type="password"
          title="Пароль"
        />
        <InputPrimary
          type="password"
          title="Подтвердите пароль"
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
