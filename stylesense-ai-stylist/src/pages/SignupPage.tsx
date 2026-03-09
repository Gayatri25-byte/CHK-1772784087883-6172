import { motion } from "framer-motion";
import LoginHero from "../components/login/LoginForm";
import SignupForm from "../components/signup/SignupForm";
import logoIcon from "../assets/logo-icon.png";

const SignupPage = () => {
  return (
    <div className="min-h-screen flex">
      

      {/* Right Section — Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <img src={logoIcon} alt="StyleSense" className="h-10 w-10" />
            <span className="text-2xl font-semibold">
              Style<span className="text-yellow-500">Sense</span>
            </span>
          </div>

          {/* Signup Form */}
          <SignupForm />

        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;