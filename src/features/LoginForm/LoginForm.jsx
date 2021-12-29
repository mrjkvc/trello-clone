import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../../_shared/components/Button/Button";
import FormItem from "../../_shared/components/FormItem/FormItem";
import InputItem from "../../_shared/components/InputItem/InputItem";
import styles from "./LoginForm.module.css";
import showPasswordIcon from "../../assets/images/showPassword.svg";
import hidePasswordIcon from "../../assets/images/hidePassword.png";
import loginService from "../../api/service/authentication";
import loadingImage from "../../assets/images/loadingimage.svg";
import LoginHeader from "../LoginHeader/LoginHeader";
import { useNavigate } from "react-router-dom";
import LinkLabel from "../../_shared/components/LinkLabel/LinkLabel";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordState, setPasswordState] = useState(false);
  const navigate = useNavigate();
  const loginFormMethods = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleChangePasswordState = () => {
    setPasswordState(!passwordState);
  };

  const onSubmit = () => {
    setLoading(true);
    loginService.login(loginFormMethods.getValues()).then((response) => {
      if (response.error == undefined) {
        setError(false);
        localStorage.setItem("token", response.token);
        localStorage.setItem("id", response.id);
        navigate("/home");
      } else {
        setError(true);
      }
      setLoading(false);
    });
  };

  return (
    <>
      <div className={styles.mainContainer}>
        {loading ? (
          <img src={loadingImage} className={styles.loadingImage}></img>
        ) : (
          <></>
        )}
        <LoginHeader text={"трело"}></LoginHeader>

        <p className={styles.headerStyle}>Welcome! Log in?</p>

        <FormProvider {...loginFormMethods}>
          <form onSubmit={loginFormMethods.handleSubmit(onSubmit)}>
            <FormItem customStyle={styles.formItemStyle}>
              <InputItem
                placeholderText={"Email"}
                inputItemStyleClass={styles.emailStyle}
                id={"username"}
                value={email}
                doRegister={true}
                requirements={""}
                handleChangeFunc={(e) => handleEmailChange(e)}
              ></InputItem>
            </FormItem>
            <FormItem customStyle={styles.formItemStyle}>
              {!passwordState ? (
                <div className={styles.columnContainer}>
                  <InputItem
                    placeholderText={"Password"}
                    id={"password"}
                    inputItemStyleClass={styles.passwordStyle}
                    value={password}
                    doRegister={true}
                    requirements={""}
                    type={"password"}
                    handleChangeFunc={(e) => handlePasswordChange(e)}
                  ></InputItem>
                  <img
                    src={showPasswordIcon}
                    className={styles.showPasswordImgStyle}
                    onClick={() => handleChangePasswordState()}
                  ></img>
                </div>
              ) : (
                <div className={styles.columnContainer}>
                  <InputItem
                    placeholderText={"Password"}
                    id={"password"}
                    inputItemStyleClass={styles.passwordStyle}
                    value={password}
                    doRegister={true}
                    requirements={""}
                    type={"text"}
                    handleChangeFunc={(e) => handlePasswordChange(e)}
                  ></InputItem>
                  <img
                    src={hidePasswordIcon}
                    className={styles.showPasswordImgStyle}
                    onClick={() => handleChangePasswordState()}
                  ></img>
                </div>
              )}
            </FormItem>
            {error && (
              <label className={styles.errorLabel}>
                Invalid username or password. Please try again.
              </label>
            )}
            <div className={styles.linkContainer}>
              <LinkLabel
                infoText="Don't have an account?"
                linkText="Register"
                onClick={() => {
                  setLoading(!loading);
                }}
              ></LinkLabel>
            </div>

            <div className={styles.columnContainer}>
              <Button
                text={"Login"}
                buttonShape={"rectangle"}
                inputType={"submit"}
                colorStyle={styles.loginButtonStyle}
                disabled={loading}
              ></Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default LoginForm;
