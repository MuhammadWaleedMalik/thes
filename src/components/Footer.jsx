import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Footer = () => {
  const { t } = useTranslation();
  
  const colors = {
    primary: "#76B900",
    secondary: "#2C3E50",
    accent: "#E74C3C",
    textDark: "#333333",
    textLight: "#FFFFFF",
    background: "#FFFFFF",
    cardBg: "#F8F9FA"
  };

  const academicResources = [
    { name: "Analytic Thesis", path: "/analytical-thesis" },
    { name: "Historical Thesis", path: "/historical-thesis" },
    { name: "Experimental Thesis", path: "/citation-tools" },
    { name: "Writting Tools ", path: "/writing-tools" }
  ];

  const supportLinks = [
    { name: "Help Center", path: "/support" },
    { name: "Academic Tutorials", path: "/tutorials" },
    { name: "Research Webinars", path: "/webinars" },
    { name: "Contact Advisors", path: "/contact" }
  ];

  const socialLinks = [
    { name: "Academic Twitter", url: "https://twitter.com", icon: "🐦" },
    { name: "ResearchGate", url: "https://researchgate.net", icon: "🔬" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "💼" },
    { name: "Google Scholar", url: "https://scholar.google.com", icon: "📚" }
  ];
  
  return (
    <footer style={{ backgroundColor: colors.secondary, color: colors.textLight }} className="pt-16 pb-10 w-full">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="flex flex-col">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              to="/"
              className="text-4xl font-bold tracking-tight"
              style={{ color: colors.primary }}
            >
              {t("ThesisAI")}
            </Link>
          </motion.div>
          <motion.p
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mt-3 text-lg"
            style={{ color: colors.textLight }}
          >
            {t("GenAI for Academics and Researchers")}
          </motion.p>
          <div className="mt-6 flex space-x-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-2xl"
                style={{ color: colors.primary }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Academic Resources */}
        <div className="text-left">
          <motion.h3
            whileHover={{ scale: 1.05, color: colors.primary }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-xl font-semibold mb-4 pb-2 border-b"
            style={{ borderColor: colors.primary }}
          >
            {t("Academic Resources")}
          </motion.h3>
          <ul className="space-y-3">
            {academicResources.map((resource, index) => (
              <motion.li
                key={index}
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Link
                  to={resource.path}
                  className="text-lg hover:underline"
                  style={{ color: colors.textLight }}
                >
                  {t(resource.name)}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

     
     
        {/* Legal & Institutional */}
        <div className="text-left">
          <motion.h3
            whileHover={{ scale: 1.05, color: colors.primary }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-xl font-semibold mb-4 pb-2 border-b"
            style={{ borderColor: colors.primary }}
          >
            {t("Institutional")}
          </motion.h3>
          <ul className="space-y-3 text-lg">
            <motion.li
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Link
                to="/terms"
                className="hover:underline"
                style={{ color: colors.textLight }}
              >
                {t("Terms of Service")}
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Link
                to="/privacy"
                className="hover:underline"
                style={{ color: colors.textLight }}
              >
                {t("Privacy Policy")}
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Link
                to="/aboutus"
                className="hover:underline"
                style={{ color: colors.textLight }}
              >
                {t("Thesis Ai")}
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
            
            </motion.li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t mt-12 pt-8 text-center" style={{ borderColor: colors.primary }}>
        <div className="flex flex-col md:flex-row justify-between items-center px-6 max-w-7xl mx-auto">
          <motion.p 
            whileHover={{ scale: 1.05 }}
            className="text-lg mb-4 md:mb-0"
            style={{ color: colors.textLight }}
          >
            &copy; {new Date().getFullYear()} {t("ThesisAI. All rights reserved.")}
          </motion.p>
          
          <div className="flex space-x-6">
         
            <motion.a
              href="#"
              whileHover={{ y: -3 }}
              className="text-sm hover:underline"
              style={{ color: colors.textLight }}
            >
              {t("Cookies")}
            </motion.a>
         
          </div>
        </div>
        
        <motion.p
          whileHover={{ scale: 1.02 }}
          className="mt-6 text-sm italic"
          style={{ color: colors.primary }}
        >
          {t("Empowering academic research through AI innovation")}
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;