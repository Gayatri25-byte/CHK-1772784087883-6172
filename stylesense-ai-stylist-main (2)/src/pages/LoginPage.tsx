import { motion } from "framer-motion";
import LoginHero from "@/components/login/LoginHero";
import LoginForm from "@/components/login/LoginForm";
import logoIcon from "@/assets/logo-icon.png";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex">
      <LoginHero />

      {/* Right — Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <img src={logoIcon} alt="StyleSense" className="h-10 w-10" />
            <span className="font-display text-2xl font-semibold">
              Style<span className="gradient-gold-text">Sense</span>
            </span>
          </div>

          <LoginForm />
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
