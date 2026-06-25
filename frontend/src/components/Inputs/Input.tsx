import { useState, type ComponentProps } from "react";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa"

function Input({
  label,
  onChange,
  placeholder,
  value,
  type,
}: ComponentProps<"input"> & { label: string }) {

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    }
  return (
    <div>
      <label className="text-[13px] text-slate-800">{label}</label>
      <div className="input-box">
        <input
          type={type == "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          onChange={(e) => onChange?.(e)}
          value={value}
          className="w-full bg-transparent outline-none"
        />
        {type === "password" && (
            <>
            {showPassword ? (
              <FaRegEye size={22} className="cursor-pointer text-primary" onClick={toggleShowPassword} />
            ) : (
              <FaRegEyeSlash size={22} className="cursor-pointer text-slate-400" onClick={toggleShowPassword} />
            )}
            </>
         
            
        )}
      </div>
    </div>
  );
}

export default Input;
