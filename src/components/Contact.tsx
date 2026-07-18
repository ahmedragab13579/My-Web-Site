import React, { useState, type JSX } from "react";
import { Mail, MapPin, Link2Icon, GitBranchIcon, Send } from "lucide-react";
import { useSubmitContactMessage } from "../BackEndIntegration/Hooks/Mutations/useContactMutations";
import { toast } from "react-toastify";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function Contact(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const submitContactMessage = useSubmitContactMessage();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitContactMessage.mutate(
      {
        senderName: formData.name,
        senderEmail: formData.email,
        subject: "Portfolio Contact Message",
        content: formData.message,
      },
      {
        onSuccess: () => {
          toast.success("Your message has been sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        onError: () => {
          toast.error("Failed to send message. Please try again.");
        },
      }
    );
  };

  const contactInfo = [
    {
      icon: <Mail className="text-brand-teal" size={24} />,
      title: "Email",
      value: "ahmedharidy2019@gmail.com",
      href: "mailto:ahmedharidy2019@gmail.com",
    },
    {
      icon: <Link2Icon className="text-brand-teal" size={24} />,
      title: "LinkedIn",
      value: "Ahmed Ragab",
      href: "https://www.linkedin.com/in/ahmed-ragab-a7041b34b",
    },
    {
      icon: <GitBranchIcon className="text-brand-teal" size={24} />,
      title: "GitHub",
      value: "ahmedragab13579",
      href: "https://github.com/ahmedragab13579",
    },
    {
      icon: <MapPin className="text-brand-teal" size={24} />,
      title: "Location",
      value: "Sohag, Egypt",
      href: "#",
    },
  ];

  return (
    <section id="contact" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-brand-cream mb-4 text-center text-4xl font-bold md:text-5xl">
          Get In Touch
        </h2>
        <p className="text-brand-cream/80 mx-auto mb-16 max-w-2xl text-center">
          I'm always interested in hearing about new projects and opportunities.
          Feel free to reach out through any of the channels below.
        </p>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Contact Information Side */}
          <div className="space-y-8">
            <h3 className="text-brand-cream mb-12 text-2xl font-bold">
              Contact Information
            </h3>

            {contactInfo.map((info, idx) => (
              <a
                key={idx}
                href={info.href}
                target={info.href.startsWith("http") ? "_blank" : "_self"}
                rel={info.href.startsWith("http") ? "noopener noreferrer" : ""}
                className="group flex cursor-pointer items-start gap-4 transition-opacity hover:opacity-80"
              >
                <div className="border-brand-teal/30 bg-brand-blue/30 group-hover:border-brand-teal rounded-lg border p-4 backdrop-blur-md transition-all">
                  {info.icon}
                </div>
                <div>
                  <p className="text-brand-cream mb-1 text-lg font-semibold">
                    {info.title}
                  </p>
                  <p className="text-brand-cream/80">{info.value}</p>
                </div>
              </a>
            ))}

            <div className="border-brand-teal/20 mt-12 border-t pt-8">
              <p className="text-brand-teal mb-4 text-sm">Available for</p>
              <div className="text-brand-cream/80 space-y-2">
                <p className="flex items-center gap-2">
                  <span className="bg-brand-teal h-2 w-2 rounded-full"></span>
                  Full-time opportunities
                </p>
                <p className="flex items-center gap-2">
                  <span className="bg-brand-teal h-2 w-2 rounded-full"></span>
                  Freelance projects
                </p>
                <p className="flex items-center gap-2">
                  <span className="bg-brand-teal h-2 w-2 rounded-full"></span>
                  Collaborations & partnerships
                </p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="border-brand-teal/30 bg-brand-blue/20 shadow-brand rounded-xl border p-8 backdrop-blur-md">
            <h3 className="text-brand-cream mb-2 text-2xl font-bold">
              Send a Message
            </h3>
            <p className="text-brand-cream/70 mb-6 text-sm">
              Send a message directly to my administrative inbox.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="text-brand-cream/90 mb-2 block text-sm font-semibold"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border-brand-teal/30 bg-[var(--card-bg)] text-brand-cream placeholder-brand-cream/40 focus:border-brand-teal focus:ring-brand-teal w-full rounded-lg border px-4 py-3 transition-all focus:ring-1 focus:outline-none"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-brand-cream/90 mb-2 block text-sm font-semibold"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-brand-teal/30 bg-[var(--card-bg)] text-brand-cream placeholder-brand-cream/40 focus:border-brand-teal focus:ring-brand-teal w-full rounded-lg border px-4 py-3 transition-all focus:ring-1 focus:outline-none"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-brand-cream/90 mb-2 block text-sm font-semibold"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="border-brand-teal/30 bg-[var(--card-bg)] text-brand-cream placeholder-brand-cream/40 focus:border-brand-teal focus:ring-brand-teal w-full resize-none rounded-lg border px-4 py-3 transition-all focus:ring-1 focus:outline-none"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitContactMessage.isPending}
                className="bg-brand-teal text-brand-dark hover:bg-brand-cream disabled:opacity-50 disabled:cursor-not-allowed flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all duration-300 cursor-pointer"
              >
                <Send size={18} />
                {submitContactMessage.isPending ? "Sending..." : "Send Message"}
              </button>

              <p className="text-brand-cream/60 text-center text-xs">
                Prefer a direct email? Reach me at{" "}
                <a
                  href="mailto:ahmedharidy2019@gmail.com"
                  className="text-brand-teal hover:text-brand-cream underline"
                >
                  ahmedharidy2019@gmail.com
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
