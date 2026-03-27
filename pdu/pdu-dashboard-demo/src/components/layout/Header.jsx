import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import LanguageDropdown from "../header/LanguageDropdown";
import ciscolive from "../../assets/ciscolive.png";
import { BsCircleHalf, BsGlobe, BsPerson, BsBoxArrowRight, BsCaretDownFill } from "react-icons/bs";

const LANGUAGES = [
  { value: "de_DE", label: "Deutsch - DE", short: "DE" },
  { value: "en_US", label: "English - US", short: "EN" },
  { value: "ja_JP", label: "日本語 - JP", short: "JP" },
  { value: "zh_Hant_TW", label: "繁體中文 - TW", short: "TW" },
];

export default function Header() {
  const { toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState("en_US");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang =
    LANGUAGES.find((l) => l.value === selectedLang) || LANGUAGES[1];

  return (
    // 6F8FA3; 2c4259; #8a99a1; 0a1015
    <header className="flex items-center justify-between h-[72px] md:h-20 lg:h-24 px-2 md:px-3 lg:px-4 xl:pr-6 xl:pl-1 bg-[#192631] border-b border-[#1b3f62] shrink-0 gap-2 md:gap-3">
      <div className="flex items-center justify-start min-w-0">
        {/* Logo div */}
        <div className="bg-red-0 px-0 w-[132px] md:w-[152px] lg:w-[170px] xl:w-[200px] flex items-center justify-center shrink-0">
          <div className="flex flex-col justify-center items-start -space-y-2">
            <span className="hidden lg:block font-bold leading-6 tracking-wide text-base xl:text-lg text-gray-200 whitespace-nowrap">
              AI Era Power Management
            </span>
            <span className="lg:hidden font-bold leading-6 tracking-wide text-sm text-gray-200 whitespace-nowrap">
              AI Era Power Management
            </span>
            <div className="h-8 w-24 md:h-9 md:w-26 lg:h-10 lg:w-28 overflow-hidden">
              <img src={ciscolive} alt="Cisco Live logo" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>

        {/* PDU Name + IP div */}
        <div className="hidden md:flex items-center gap-1 min-w-0 pl-1 md:pl-2">
          <span className="text-white text-md lg:text-md font-light leading-6 tracking-wide no-underline hover:underline whitespace-nowrap truncate max-w-[150px] lg:max-w-[220px] xl:max-w-none">
            CHG01-101-D-17-PDU-1
          </span>
          <span className="hidden lg:inline text-white text-sm lg:text-md whitespace-nowrap">
            (10.6.4.240)
          </span>
        </div>
      </div>
      {/* <div className="flex items-center gap-1 min-w-0">
          <span className="text-white text-lg font-light leading-6 tracking-tight no-underline hover:underline whitespace-nowrap">
            CHG01-101-B-02-PDU-2
          </span>
          <span className="text-white text-md whitespace-nowrap">
            (10.6.4.69)
          </span>
        </div> */}
      <div className="flex items-center gap-1.5 md:gap-2 lg:gap-3 text-sm lg:text-md shrink-0">
      {/* <div className="flex items-center gap-1 min-w-0">
          <span className="text-white text-lg font-light leading-6 tracking-tight no-underline hover:underline whitespace-nowrap">
            CHG01-101-B-02-PDU-2
          </span>
          <span className="text-white text-md whitespace-nowrap">
            (10.6.4.69)
          </span>
        </div>
        <span className="text-white/60">|</span> */}

        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded hover:bg-white/10 text-white"
          title="Toggle theme (applies to main content)"
          aria-label="Toggle theme"
        >
          <BsCircleHalf className="" />
        </button>
        <span className="hidden md:inline text-white/60">|</span>

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((o) => !o)}
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10 text-white"
            aria-expanded={dropdownOpen}
            aria-haspopup="listbox"
            aria-label="Language"
          >
            <BsGlobe className="text-lg" />
            <span>{currentLang.short}</span>
            <BsCaretDownFill className="" />
          </button>
          {dropdownOpen && (
            <LanguageDropdown
              options={LANGUAGES}
              selected={selectedLang}
              onSelect={(value) => {
                setSelectedLang(value);
                setDropdownOpen(false);
              }}
              onClose={() => setDropdownOpen(false)}
            />
          )}
        </div>

        <span className="hidden md:inline text-white/60">|</span>
        <span className="flex items-center gap-1 text-white">
          <BsPerson className="text-xl" />
          <span className="hidden lg:inline">{user ?? "Administrator"}</span>
        </span>
        <span className="hidden md:inline text-white/60">|</span>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-1 text-white cursor-pointer hover:underline bg-transparent border-none p-0 font-inherit"
        >
          <BsBoxArrowRight className="text-xl" />
          <span className="hidden lg:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
