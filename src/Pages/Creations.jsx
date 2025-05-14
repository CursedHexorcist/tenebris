import React, { useEffect, useState, useCallback } from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Boxes } from "lucide-react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";

// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#06B6D4]/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const techStacks = [
  { 
    category: "Frontend",
    stacks: [
      { icon: "html.svg", language: "HTML" },
      { icon: "css.svg", language: "CSS" },
      { icon: "javascript.svg", language: "JavaScript" },
      { icon: "reactjs.svg", language: "ReactJS" },
      { icon: "vite.svg", language: "Vite" },
    ]
  },
  { 
    category: "Backend",
    stacks: [
      { icon: "nodejs.svg", language: "Node JS" },
      { icon: "firebase.svg", language: "Firebase" },
    ]
  },
  { 
    category: "Styling",
    stacks: [
      { icon: "tailwind.svg", language: "Tailwind CSS" },
      { icon: "bootstrap.svg", language: "Bootstrap" },
      { icon: "MUI.svg", language: "Material UI" },
    ]
  },
  { 
    category: "Other",
    stacks: [
      { icon: "vercel.svg", language: "Vercel" },
      { icon: "SweetAlert.svg", language: "SweetAlert2" },
    ]
  }
];

const developers = {
  gween: [
    { icon: "html.svg", language: "HTML" },
    { icon: "css.svg", language: "CSS" },
    { icon: "javascript.svg", language: "JavaScript" },
    { icon: "reactjs.svg", language: "ReactJS" },
    { icon: "tailwind.svg", language: "Tailwind CSS" },
  ],
  nier: [
    { icon: "nodejs.svg", language: "Node JS" },
    { icon: "firebase.svg", language: "Firebase" },
    { icon: "MUI.svg", language: "Material UI" },
    { icon: "bootstrap.svg", language: "Bootstrap" },
  ]
};

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  useEffect(() => {
    // Initialize AOS once
    AOS.init({
      once: false,
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Creations">
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-[#FFD6E7]">
          <span style={{
            color: '#06B6D4',
            backgroundImage: 'linear-gradient(45deg, #06B6D4 10%, #FFD6E7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Our Tech Stack
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Technologies We Work With
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(6, 182, 212, 0.03) 0%, rgba(255, 214, 231, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(6, 182, 212, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(255, 214, 231, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(6, 182, 212, 0.2)",
                  "& .lucide": {
                    color: "#06B6D4",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Developers"
              {...a11yProps(1)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex flex-col justify-center items-center overflow-hidden pb-[5%] gap-8">
              {techStacks.map((category, index) => (
                <div key={index} className="w-full" data-aos="fade-up" data-aos-duration="1000">
                  <h3 className="text-xl font-semibold text-[#06B6D4] mb-4">{category.category}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-8 gap-5">
                    {category.stacks.map((stack, stackIndex) => (
                      <div key={stackIndex}>
                        <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex flex-col justify-center items-center overflow-hidden pb-[5%] gap-12">
              {/* Gween's Tech Stack */}
              <div className="w-full" data-aos="fade-up" data-aos-duration="1000">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#FFD6E7] flex items-center justify-center">
                    <span className="text-white font-bold text-sm">G</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Gween</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-8 gap-5">
                  {developers.gween.map((stack, index) => (
                    <div key={index}>
                      <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Nier's Tech Stack */}
              <div className="w-full" data-aos="fade-up" data-aos-duration="1200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FFD6E7] to-[#06B6D4] flex items-center justify-center">
                    <span className="text-white font-bold text-sm">N</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Nier</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-8 gap-5">
                  {developers.nier.map((stack, index) => (
                    <div key={index}>
                      <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}
