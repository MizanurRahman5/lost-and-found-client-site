import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <footer className="bg-[#0D1B2A] text-[#E9ECEF] py-12">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left mb-6 md:mb-0">
            <div className="md:text-8xl font-extrabold text-[#F4A261] tracking-wide">
              WHEREISIT
            </div>
            <p className="text-sm md:text-base mt-2">
              Supporting entrepreneurs, creators, and communities since 2008.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex text-[#F4A261] space-x-6 text-lg">
            {[
              { id: 1, icon: "facebook-f" },
              { id: 2, icon: "twitter" },
              { id: 3, icon: "youtube" },
              { id: 4, icon: "instagram" },
              { id: 5, icon: "linkedin-in" },
            ].map((social) => (
              <a
                key={social.id}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.icon}
                className="hover:text-[#E76F51] transition duration-300 transform hover:scale-125"
              >
                <i className={`fab fa-${social.icon}`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left mb-12">
          {[
            {
              id: 1,
              title: "DISCOVER",
              links: [
                { id: 1, title: "Top-Funded Campaigns", href: "#" },
                { id: 2, title: "Tech & Innovation", href: "#" },
                { id: 3, title: "Creative Campaigns", href: "#" },
                { id: 4, title: "Community & Culture", href: "#" },
                { id: 5, title: "Blog", href: "#" },
              ],
            },
            {
              id: 2,
              title: "LAUNCH",
              links: [
                { id: 1, title: "Start A Campaign", href: "#" },
                { id: 2, title: "Experts Directory", href: "#" },
                { id: 3, title: "Enterprise", href: "#" },
                { id: 4, title: "China", href: "#" },
              ],
            },
            {
              id: 3,
              title: "LEARN",
              links: [
                { id: 1, title: "How It Works", href: "#" },
                { id: 2, title: "Education Center", href: "#" },
                { id: 3, title: "What is Crowdfunding?", href: "#" },
                { id: 4, title: "Trust & Safety", href: "#" },
              ],
            },
            {
              id: 4,
              title: "CONTACT",
              links: [
                { id: 1, title: "Help & Support", href: "#" },
                { id: 2, title: "Press", href: "#" },
                { id: 3, title: "Careers", href: "#" },
                { id: 4, title: "Get In Touch", href: "#" },
              ],
            },
          ].map((section) => (
            <div key={section.id}>
              <h4 className="text-xl font-bold text-[#F4A261] mb-4">
                {section.title}
              </h4>
              {section.links.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="block text-sm hover:text-[#E76F51] transition duration-300"
                >
                  {link.title}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <p className="text-xs text-center mt-6">
          © 2024 Wherisit, Inc. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
