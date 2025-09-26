import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import Button from "../../components/button/Button";
import FormButton from "../../components/button/FormButton";
import FormInput from "../../components/button/FormInput";
import FormTextarea from "../../components/button/FormTextarea";
import AddressImg from "./AddressImg";
import { Fade } from "react-awesome-reveal";
import "./ContactComponent.css";
import { greeting, contactPageData } from "../../portfolio";
import { useTheme } from "styled-components";
import ReCAPTCHA from "react-google-recaptcha";
import SocialMedia from "../../components/socialMedia/SocialMedia";

const ContactData = contactPageData.contactSection;

function ContactForm() {
  const [state, handleSubmit] = useForm("xgvnvyev");
  const recaptchaRef = React.useRef<any>(null);
  const theme = useTheme();

  // Form field states
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [captchaToken, setCaptchaToken] = React.useState<string | null>(null);

  const onChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };

  // Check if form is valid (all required fields filled and captcha validated)
  const isFormValid =
    email.trim() !== "" && message.trim() !== "" && captchaToken !== null;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleSubmit(event);
  };

  if (state.succeeded) {
    return (
      <div
        style={{
          padding: "2rem",
          textAlign: "center",
          color: theme.text,
          backgroundColor: theme.highlight,
          borderRadius: "6px",
          marginTop: "1rem",
        }}
      >
        <h3>Thanks for your message!</h3>
        <p>I'll get back to you as soon as possible.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} style={{ marginTop: "2rem", width: "100%" }}>
      <FormInput
        id="email"
        name="email"
        type="email"
        label="Your email"
        placeholder="your.email@example.com"
        required
        showRequired={false}
        value={email}
        onChange={handleEmailChange}
        theme={theme}
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} />

      <FormTextarea
        id="message"
        name="message"
        label="Message"
        placeholder="Hi Marco, My name is ... I'm writing to you regarding..."
        required
        showRequired={false}
        rows={6}
        value={message}
        onChange={handleMessageChange}
        theme={theme}
      />
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY || ""}
        onChange={onChange}
        theme={theme.isDark ? "dark" : "light"}
        key={theme.isDark ? "dark" : "light"}
      />
      <ValidationError prefix="Message" field="message" errors={state.errors} />
      <FormButton
        text={state.submitting ? "Sending..." : "Send Message"}
        type="submit"
        disabled={state.submitting || !isFormValid}
        theme={theme}
        className="contact-form-button"
      />
    </form>
  );
}

export default function ContactComponent(): JSX.Element {
  const theme = useTheme();

  return (
    <div className="contact-main">
      <Header />
      <div className="basic-contact">
        <Fade bottom duration={1000} distance="40px">
          <div className="contact-heading-div" style={{ textAlign: "center" }}>
            <div className="contact-heading-text-div">
              <h1
                className="contact-heading-text"
                style={{ color: theme.text }}
              >
                {ContactData.title}
              </h1>
              <SocialMedia />

              {greeting.resumeLink && (
                <div className="resume-btn-div">
                  <Button
                    text="See my Curriculum Vitae"
                    to={greeting.resumeLink}
                    theme={theme}
                  />
                </div>
              )}
            </div>
          </div>
        </Fade>
        <Fade bottom duration={1000} distance="40px">
          <div className="address-heading-div">
            <div className="address-heading-text-div">
              <ContactForm />
            </div>
            <div className="contact-heading-img-div">
              <AddressImg />
            </div>
          </div>
        </Fade>
      </div>
      <Footer />
      <TopButton />
    </div>
  );
}
