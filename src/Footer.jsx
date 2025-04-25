import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full px-6 py-10 mt-20 backdrop-blur-xl bg-black/60 border-t border-emerald-500/10 shadow-inner shadow-emerald-500/10 text-white">
      <div className="max-w-6xl mx-auto text-center space-y-6">
        <h3 className="text-3xl font-extrabold text-emerald-400 drop-shadow-lg animate-pulse">
          Powered by ThinkGPT
        </h3>

        <p className="text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
          ThinkGPT is your intelligent AI companion. Ask anything — from code to casual conversation — and get instant answers powered by advanced AI.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="https://github.com/Tanmay-Chandgude"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-emerald-400 hover:text-white transition-all duration-300"
          >
            <FaGithub className="text-xl" />
            <span className="text-sm underline-offset-4 hover:underline">GitHub</span>
          </a>
        </div>

        <div className="text-xs text-gray-600 mt-6">
          <p>&copy; {new Date().getFullYear()} ThinkGPT AI — Built with 💚 by Tanmay Chandgude</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
