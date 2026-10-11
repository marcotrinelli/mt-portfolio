import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import PageHero from "../../components/pageHero/PageHero";
import FormButton from "../../components/button/FormButton";
import FormInput from "../../components/button/FormInput";
import FormTextarea from "../../components/button/FormTextarea";
import "./ContactComponent.css";
import { contactPageData } from "../../portfolio";
import { useTheme } from "styled-components";
import ReCAPTCHA from "react-google-recaptcha";
import ReactGA from "react-ga4";
import { FaArrowRight, FaPaperPlane } from "react-icons/fa6";

function ContactForm() {
  const [state, handleSubmit] = useForm("xgvnvyev");
  const recaptchaRef = React.useRef<ReCAPTCHA>(null);
  const theme = useTheme();

  // Form field states
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [captchaToken, setCaptchaToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (state.succeeded) {
      ReactGA.event("generate_lead", { form_name: "contact" });
    }
  }, [state.succeeded]);

  // A reCAPTCHA token is single-use, so a failed send needs a fresh one
  React.useEffect(() => {
    if (state.errors) {
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    }
  }, [state.errors]);

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

  // Errors not tied to a field (network, captcha, rate limit), shown as one message the visitor can act on
  const hasFormError = (state.errors?.getFormErrors().length ?? 0) > 0;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleSubmit(event);
  };

  if (state.succeeded) {
    return (
      <div className="contact-success" role="status">
        <strong>Thanks for your message!</strong>
        <span>I'll get back to you as soon as possible.</span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="contact-form">
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
      />
      <ValidationError
        prefix="Email"
        field="email"
        errors={state.errors}
        className="contact-field-error"
      />

      <FormTextarea
        id="message"
        name="message"
        label="Message"
        placeholder="A few lines on who you are and what you have in mind."
        required
        showRequired={false}
        rows={6}
        value={message}
        onChange={handleMessageChange}
      />
      <ValidationError
        prefix="Message"
        field="message"
        errors={state.errors}
        className="contact-field-error"
      />
      <div className="contact-submit-row">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY || ""}
          onChange={onChange}
          theme={theme.isDark ? "dark" : "light"}
          key={theme.isDark ? "dark" : "light"}
        />
        <FormButton
          text={
            <>
              {state.submitting ? "Sending..." : "Send Message"}
              {!state.submitting && <FaPaperPlane aria-hidden="true" />}
            </>
          }
          type="submit"
          disabled={state.submitting || !isFormValid}
          className="contact-submit"
        />
        {hasFormError && (
          <p className="contact-form-error" role="alert">
            The message didn't go through. Please try again in a moment.
          </p>
        )}
      </div>
    </form>
  );
}

export default function ContactComponent(): JSX.Element {
  const { alternative } = contactPageData;

  return (
    <div>
      <Header pageTitle={contactPageData.title} />
      <PageHero
        eyebrow={contactPageData.title}
        title={contactPageData.headline}
        titleAccent={contactPageData.headlineAccent}
        lede={contactPageData.subtitle}
        media={
          <div className="contact-card surface-card">
            <ContactForm />
          </div>
        }
      >
        {alternative && (
          <p className="contact-alternative">
            <alternative.icon
              className="contact-alternative-icon"
              aria-hidden="true"
            />
            {alternative.lead}{" "}
            <a
              className="text-link"
              href={alternative.link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                ReactGA.event("contact_alternative_click", {
                  link_text: alternative.link.name,
                  link_url: alternative.link.url,
                })
              }
            >
              {alternative.link.name}
              <FaArrowRight aria-hidden="true" />
            </a>
          </p>
        )}
      </PageHero>
      <Footer />
    </div>
  );
}
