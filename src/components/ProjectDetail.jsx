import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import { motion } from "framer-motion";
import ProjectStats from "../components/ProjectStats";
import Aos from "aos";
import "aos/dist/aos.css";

const PAYMENT_METHODS = [
  { id: 'dana', name: 'DANA' },
  { id: 'gopay', name: 'GoPay' },
  { id: 'ovo', name: 'OVO' },
];

const PaymentOption = ({ method, selected, onClick }) => (
  <div
    onClick={onClick}
    className={`group w-full md:w-auto flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-300 cursor-pointer ${
      selected
        ? 'border-[#06B6D4] bg-[#06B6D4]/10 shadow-lg'
        : 'border-white/10 hover:border-[#06B6D4]/30'
    }`}
  >
    <div className="flex items-center gap-3">
      {/* Logo sementara dinonaktifkan */}
      {/* <img src={method.logo} alt={method.name} className="w-8 h-8 md:w-10 md:h-10 object-contain" /> */}
      <span className="text-white text-sm md:text-base font-medium">{method.name}</span>
    </div>
    {selected && (
      <div className="text-[#06B6D4] font-bold text-xs md:text-sm">Terpilih</div>
    )}
  </div>
);

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    Aos.init({ duration: 800 });
  }, []);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const db = getFirestore(app);
        const projectRef = collection(db, "projects");
        const snapshot = await getDocs(projectRef);
        const projectList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const foundProject = projectList.find((p) => p.id === id);
        if (!foundProject) {
          navigate("/notfound");
        } else {
          setProject(foundProject);
          localStorage.setItem("selectedProject", JSON.stringify(foundProject));
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [id, navigate]);

  if (!project) {
    return (
      <div className="text-center text-white py-20 animate-fadeIn">
        <p className="text-lg md:text-xl">Memuat detail proyek...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 md:p-12 max-w-4xl mx-auto text-white animate-fadeIn"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-2xl md:text-4xl font-bold mb-4">{project.name}</h1>
      <p className="text-gray-300 mb-6">{project.description}</p>

      <ProjectStats project={project} />

      {/* Payment Section */}
      <div className="mt-10 md:mt-16 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 shadow-md animate-fadeIn space-y-6">
        <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Pilih Metode Pembayaran</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PAYMENT_METHODS.map((method) => (
            <PaymentOption
              key={method.id}
              method={method}
              selected={selectedPayment === method.id}
              onClick={() => setSelectedPayment(method.id)}
            />
          ))}
        </div>

        {selectedPayment && (
          <div className="mt-6 p-4 bg-[#06B6D4]/5 rounded-xl border border-[#06B6D4]/30">
            <p className="text-white text-sm">
              Kamu memilih metode pembayaran <strong>{selectedPayment.toUpperCase()}</strong>. Silakan lanjutkan ke tahap berikutnya.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectDetails;
