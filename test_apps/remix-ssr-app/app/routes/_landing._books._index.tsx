import { ActionFunction } from "@remix-run/node";
import { useActionData, Form as RemixForm, json } from "@remix-run/react";

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const success = !!formData;
  
    return json({ success });
  };
  
export default function Form() {
  const actionData = useActionData();

  return (
    <section className="form-container">
        <h2 className="title">Napisz do nas!</h2>
        <RemixForm replace method="post" action="/?index" >
            <div className="form-group">
            <label htmlFor="name">Imię:</label>
            <input
                type="text"
                id="name"
                name="name"
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="subject">Temat:</label>
            <input
                type="text"
                id="subject"
                name="subject"
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="message">Wiadomość:</label>
            <textarea
                id="message"
                name="message"
                required
            />
            </div>
            <div className="button-container">
            <button type="submit">Wyślij</button>
            </div>
        </RemixForm>
        {actionData?.success && <p className="success-message">Wiadomość została wysłana!</p>}
    </section>
  );
}
