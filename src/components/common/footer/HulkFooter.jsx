import hulklogo from "../../../assets/hulklogo.jpg";
import { AiOutlineInstagram, AiFillTwitterCircle } from "react-icons/ai";
import { IoLogoFacebook } from "react-icons/io";

export const HulkFooter = () => {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex justify-center items-center">
            <img
              src={hulklogo}
              className="w-20 rounded-xl opacity-80"
              alt="HulkStore logo"
            />
          </div>
          <div className="flex justify-center items-center gap-5">
            <a href="*" aria-label="Facebook" className="text-zinc-600 hover:text-green-500 transition-colors">
              <IoLogoFacebook size={30} />
            </a>
            <a href="*" aria-label="Instagram" className="text-zinc-600 hover:text-green-500 transition-colors">
              <AiOutlineInstagram size={30} />
            </a>
            <a href="*" aria-label="Twitter" className="text-zinc-600 hover:text-green-500 transition-colors">
              <AiFillTwitterCircle size={30} />
            </a>
          </div>
          <div className="flex justify-center items-center">
            <address className="not-italic text-zinc-500 text-sm leading-relaxed">
              +34 654 321 098 <br />
              Valencia, España <br />
              hulkstore@hulkstore.com
            </address>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
          <p className="text-zinc-700 text-xs">
            &copy; HulkStore 2026. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
