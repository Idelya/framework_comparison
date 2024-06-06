import React, { useState } from "react";

const Form = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="form-container">
      <h2 className="title">Napisz do nas!</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Imię:</label>
          <input type="text" id="name" name="name" value={formState.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formState.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Temat:</label>
          <input type="text" id="subject" name="subject" value={formState.subject} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Wiadomość:</label>
          <textarea id="message" name="message" value={formState.message} onChange={handleChange} required />
        </div>
        <div className="button-container">
          <button type="submit">Wyślij</button>
        </div>
      </form>
      {submitted && <p className="success-message">Wiadomość została wysłana!</p>}
    </section>
  );
};

export default Form;
