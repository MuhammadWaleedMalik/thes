import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiMenu, FiX, FiChevronDown, FiGlobe } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';


const colors = {
  primary: "#76B900",
  secondary: "#2C3E50",
  accent: "#E74C3C",
  textDark: "#333333",
  textLight: "#FFFFFF",
  background: "gray",
  cardBg: "#F8F9FA"
};

const Navbar = () => {
  
  const { t, i18n } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAIFeaturesOpen, setIsAIFeaturesOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const aiDropdownRef = useRef(null);
  const langDropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (aiDropdownRef.current && !aiDropdownRef.current.contains(event.target )) {
        setIsAIFeaturesOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target )) {
        setIsLanguageMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleAIFeatures = () => setIsAIFeaturesOpen(!isAIFeaturesOpen);
  const toggleLanguageMenu = () => setIsLanguageMenuOpen(!isLanguageMenuOpen);
  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  return (
    <nav 
    className={`fixed w-full bg-gray-300 z-50 transition-all duration-300 ${isScrolled ? 'bg-red/90 backdrop-blur-md' : 'bg-red'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">

          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <img src={"/images/logo.jpg"} alt="Logo Image" className="w-12 h-12 object-contain" />
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-[32px] font-bold font-mono "
                style={{ color: colors.primary }}
              >Thesis Ai</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
       
            <NavLink to="/" style={{ color: colors.primary }} className="nav-link">
              {t('home')}
            </NavLink>
            <NavLink to="/pricing" style={{ color: colors.primary }} className="nav-link">
              {t('pricing')}
            </NavLink>
            <NavLink to="/explore" style={{ color: colors.primary }} className="nav-link">
              {t('Make Thesis')}
            </NavLink>

          
          

       
       
            {/* Language Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                style={{ color: colors.primary , hover: "blue"}}
                className="nav-link flex items-center" onClick={toggleLanguageMenu}>
                <FiGlobe className="mr-1" /> {languages.find(lang => lang.code === i18n.language)?.name || 'English'}
              </button>

              {isLanguageMenuOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-[#CADCFC] text-black border border-[#00246B] z-50">
                
                  {languages.map((language) => (
                    <button key={language.code} onClick={() => changeLanguage(language.code)} className="w-full text-left block px-4 py-2 text-sm 
                    hover:bg-[#00246B] hover:text-[#CADCFC] ">
                      {language.nativeName} ({language.name})
                    </button>
                  ))}
                </div>
              )}
        
        
            </div>
      
      
      
          </div>

          {/* Authentication */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <button onClick={logout} className="btn bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded">
                {t('logout')}
              </button>
            ) : (
              <>

              {/* #CADCFC #00246B */}
                <Link to="/login"
                className="btn  hover:bg-[white] hover:text-[#00246B]  px-4 py-2 rounded"
                style={{ color: colors.secondary , backgroundColor: colors.primary  }}
                
                  >
                  {t('login')}
                </Link>
                <Link to="/signup" 
                
                className="btn  hover:bg-[white] hover:text-[#00246B]  px-4 py-2 rounded"
                style={{ color: colors.secondary , backgroundColor: colors.primary  }}
           
                >
                
                  {t('signup')}
                </Link>
              </>
            )}
          </div>
        </div>


        <div className="flex justify-end items-center">
          {/* Menu Button (Mobile Only) */}
          <button onClick={toggleMenu} className="text-black text-3xl md:hidden">
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
      
        {isMenuOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center space-y-6 text-white text-xl z-50 w-screen h-screen">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 text-3xl text-white"
            >
              <FiX />
            </button>


            {/* className="btn  hover:bg-[white] hover:text-[#00246B]  px-4 py-2 rounded"
                style={{ color: colors.secondary , backgroundColor: colors.primary  }}
            */}
            <NavLink
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-[blue] text-[white] transition-colors"
              >
              {t('home')}
            </NavLink>
            <NavLink
              to="/pricing"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-[blue] text-[white] transition-colors"
              >
              {t('pricing')}
            </NavLink>
            <NavLink
              to="/explore"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-[blue] text-[white] transition-colors"
              >
              {t('Make Thesis')}

            </NavLink>


          
          
    
















            {/* Language Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button className="nav-link
              
              hover:text-[blue] text-[white] transition-colors
               flex items-center" onClick={toggleLanguageMenu}>
                <FiGlobe className="mr-1" /> {languages.find(lang => lang.code === i18n.language)?.name || 'English'}
              </button>

              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[#CADCFC] text-[blue] border border-[#00246B] z-50">
                  {languages.map((language) => (
                    <button key={language.code} onClick={() => changeLanguage(language.code)} className="w-full text-left block px-4 py-2 text-sm  hover:bg-[#00246B] hover:text-[#CADCFC]">
                      {language.nativeName} ({language.name})
                    </button>
                  ))}
                </div>
              )}
        
        
            </div>
      










    
            {/* Authentication (Login/Logout) */}
            {isAuthenticated ? (
              <button
          onClick={() => {
            logout();
            setIsMenuOpen(false);
          }}
          className="btn bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded transition-colors"
              >
          {t('logout')}
              </button>
            ) : (
              <>
          <Link
            to="/login"
            className="btn bg-[#CADCFC] hover:bg-[#00246B] hover:text-[#CADCFC] text-[#00246B] px-4 py-2 rounded"
            onClick={() => setIsMenuOpen(false)}          
            >
            {t('login')}
          </Link>
          <Link
            to="/signup"
            onClick={() => setIsMenuOpen(false)}
            className="btn bg-[#CADCFC] hover:bg-[#00246B] hover:text-[#CADCFC] text-[#00246B] px-4 py-2 rounded"
>
            {t('signup')}
          </Link>
              </>
            )}
          </div>
        )}

      
      </div>
    </nav>
  );
};

export default Navbar;





















