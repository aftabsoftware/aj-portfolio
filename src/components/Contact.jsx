import { useEffect, useState } from "react";

export default function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const captcha = event.target.querySelector(
      'textarea[name="h-captcha-response"]'
    )?.value;

    if (!captcha) {
      setResult("Please complete the captcha");
      return;
    }

    setResult("Sending...");

    const formData = new FormData(event.target);

    // 🔑 Replace with your Web3Forms access key
    formData.append("access_key", "ae50f126-b3b7-4abc-898e-d68c41b9041d");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message sent successfully ✅");
        event.target.reset();
      } else {
        setResult(data.message);
      }
    } catch (error) {
      setResult("Something went wrong");
    }
  };

  function CaptchaLoader() {
    const captchadiv = document.querySelectorAll('[data-captcha="true"]');

    if (captchadiv.length) {
      captchadiv.forEach(function (item) {
        const sitekey = item.dataset.sitekey;

        if (!sitekey) {
          item.dataset.sitekey = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";
        }
      });

      const script = document.createElement("script");
      script.src = "https://js.hcaptcha.com/1/api.js?recaptchacompat=off";
      script.async = true;
      script.defer = true;

      document.body.appendChild(script);
    }
  }

  useEffect(() => {
    CaptchaLoader();
  }, []);

  return (
    <div
      id="contact"
      className="w-full px-[12%] py-10 scroll-mt-20 bg-[url('./assets/footer-bg-color.png')] bg-no-repeat bg-[length:90%_auto] bg-center dark:bg-none"
    >
      <h4 className="text-center mb-2 text-lg font-Ovo">Connect with me</h4>
      <h2 className="text-center text-5xl font-Ovo">Get in touch</h2>

      <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
        I'd love to hear from you! If you have any questions, comments or
        feedback, please use the form below.
      </p>

      <form onSubmit={onSubmit} className="max-w-2xl mx-auto">
        <input
          type="hidden"
          name="subject"
          value="New message from Aftab Jagirdar Portfolio"
        />

        <div className="grid grid-cols-auto gap-6 mt-10 mb-8">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-1 dark:border-white/30 bg-white dark:bg-darkHover/30"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-1 dark:border-white/30 bg-white dark:bg-darkHover/30"
          />
        </div>

        <textarea
          rows="6"
          name="message"
          placeholder="Enter your message"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-1 mb-6 dark:border-white/30 bg-white dark:bg-darkHover/30"
        ></textarea>

        {/* CAPTCHA */}
        <div
          className="h-captcha mb-6 max-w-full"
          data-captcha="true"
        ></div>

        <button
          type="submit"
          className="py-2 px-8 flex items-center gap-2 bg-black/80 text-white rounded-full mx-auto hover:bg-black duration-500 dark:bg-transparent dark:border dark:border-white/30 dark:hover:bg-darkHover"
        >
          Submit now
          <img src="./assets/right-arrow-white.png" alt="" className="w-4" />
        </button>

        <p className="mt-4 text-center">{result}</p>
      </form>
    </div>
  );
}