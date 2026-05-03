import { useState, type JSX } from "react";
import { ExternalLink } from "lucide-react";
import { certificatesData, getCategories } from "../data/certificatesData";

export default function Certifications(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const categories = getCategories();

  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const filteredCertificates =
    selectedCategory === "All"
      ? certificatesData
      : certificatesData.filter((cert) => cert.category === selectedCategory);

  const handleImageError = (id: number) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      id="certifications"
      className="overflow-hidden px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="section-title">Certifications & Achievements</h2>

        {/* Filter Buttons */}
        <div className="animate-slide-up mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-6 py-2 font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-brand-teal shadow-brand text-brand-dark"
                  : "border-brand-teal text-brand-cream hover:bg-brand-teal hover:text-brand-dark border-2 bg-transparent"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Horizontal Scroll Container (Carousel) */}
        <div className="animate-slide-up relative">
          <div className="from-brand-dark pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-12 bg-linear-to-r to-transparent"></div>
          <div className="from-brand-dark pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-12 bg-linear-to-l to-transparent"></div>

          {/* التعديل هنا: ضفنا كلاسات التوسيط المشروطة بناءً على عدد الكروت */}
          <div
            className={`flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pt-4 pb-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
              filteredCertificates.length < 4 ? "lg:justify-center" : ""
            } ${filteredCertificates.length < 3 ? "md:justify-center" : ""} ${
              filteredCertificates.length === 1 ? "justify-center" : ""
            }`}
          >
            {filteredCertificates.map((cert) => (
              <div
                key={cert.id}
                className="card-luxury flex w-[320px] shrink-0 snap-center flex-col overflow-hidden p-0 transition-transform hover:-translate-y-2 md:w-87.5"
              >
                <div className="border-brand-teal/30 bg-brand-dark/50 relative flex h-48 w-full items-center justify-center border-b">
                  {cert.imagepath && !imageErrors[cert.id] ? (
                    <img
                      src={cert.imagepath}
                      alt={cert.title}
                      onError={() => handleImageError(cert.id)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div
                      className={`flex h-full w-full items-center justify-center bg-linear-to-br ${cert.color} text-6xl text-white`}
                    >
                      {cert.icon}
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6 text-center">
                  <h3 className="text-brand-cream mb-2 line-clamp-2 min-h-14 text-lg font-bold">
                    {cert.title}
                  </h3>
                  <p className="text-brand-teal mb-6 text-sm font-medium">
                    {cert.category}
                  </p>

                  <button
                    onClick={() => window.open(cert.pdfLink, "_blank")}
                    className="hover:text-brand-dark border-brand-teal/30 text-brand-cream hover:bg-brand-teal mt-auto flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors"
                  >
                    <ExternalLink size={16} />
                    View Credential
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredCertificates.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-brand-cream/60 text-lg">
              No certificates found in this category.
            </p>
          </div>
        )}

        <div className="animate-fade-in mt-12 grid gap-6 md:grid-cols-4">
          {[
            {
              number: certificatesData.length + "+",
              label: "Total Certifications",
            },
            { number: categories.length - 1, label: "Categories" },
            {
              number:
                certificatesData.filter((c) => c.category === "Backend")
                  .length + "+",
              label: "Backend Certs",
            },
            {
              number:
                certificatesData.filter((c) => c.category === "Security")
                  .length + "+",
              label: "Security Certs",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="card-luxury flex flex-col items-center justify-center p-6 text-center"
            >
              <p className="text-brand-teal mb-2 text-4xl font-extrabold">
                {stat.number}
              </p>
              <p className="text-brand-cream/80 text-sm font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
