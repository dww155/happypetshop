import { Eye, EyeOff, KeyRound, ShieldCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { updatePassword } from "../../../../services/userService";

interface ChangePasswordFormProps {
  userId: string;
}

interface FormErrors {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export default function ChangePasswordForm({ userId }: ChangePasswordFormProps) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!oldPassword) {
      nextErrors.oldPassword = "Vui lòng nhập mật khẩu hiện tại.";
    }

    if (!newPassword) {
      nextErrors.newPassword = "Vui lòng nhập mật khẩu mới.";
    } else if (!PASSWORD_PATTERN.test(newPassword)) {
      nextErrors.newPassword =
        "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.";
    } else if (newPassword === oldPassword) {
      nextErrors.newPassword = "Mật khẩu mới phải khác mật khẩu hiện tại.";
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Vui lòng xác nhận mật khẩu mới.";
    } else if (confirmPassword !== newPassword) {
      nextErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      await updatePassword(userId, { oldPassword, newPassword });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrors({});
      setMessage({ type: "success", text: "Đổi mật khẩu thành công." });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Đổi mật khẩu thất bại.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full rounded-lg border bg-[#fffdf8] px-4 py-3 pr-12 text-[#3d2b1f] outline-none transition focus:ring-2 focus:ring-[#f7b267] ${
      hasError ? "border-red-400" : "border-[#d8c1ab]"
    }`;

  return (
    <div className="pet-card max-w-2xl rounded-lg p-6 sm:p-8">
      <div className="mb-6 flex items-start gap-4">
        <div className="rounded-lg bg-[#f5eadc] p-3 text-[#9f5f36]">
          <KeyRound className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#3d2b1f]">Đổi mật khẩu</h2>
          <p className="mt-1 text-sm text-[#6d5a49]">
            Sử dụng mật khẩu mạnh và không chia sẻ mật khẩu với người khác.
          </p>
        </div>
      </div>

      {message && (
        <div
          role="alert"
          className={`mb-5 rounded-lg border px-4 py-3 text-sm font-medium ${
            message.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <PasswordField
          id="old-password"
          label="Mật khẩu hiện tại"
          value={oldPassword}
          showPassword={showPasswords}
          error={errors.oldPassword}
          autoComplete="current-password"
          onChange={(value) => {
            setOldPassword(value);
            setErrors((current) => ({ ...current, oldPassword: undefined }));
          }}
          inputClass={inputClass}
        />

        <PasswordField
          id="new-password"
          label="Mật khẩu mới"
          value={newPassword}
          showPassword={showPasswords}
          error={errors.newPassword}
          autoComplete="new-password"
          onChange={(value) => {
            setNewPassword(value);
            setErrors((current) => ({ ...current, newPassword: undefined }));
          }}
          inputClass={inputClass}
        />

        <PasswordField
          id="confirm-password"
          label="Xác nhận mật khẩu mới"
          value={confirmPassword}
          showPassword={showPasswords}
          error={errors.confirmPassword}
          autoComplete="new-password"
          onChange={(value) => {
            setConfirmPassword(value);
            setErrors((current) => ({ ...current, confirmPassword: undefined }));
          }}
          inputClass={inputClass}
        />

        <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-[#6d5a49]">
          <input
            type="checkbox"
            checked={showPasswords}
            onChange={(event) => setShowPasswords(event.target.checked)}
            className="h-4 w-4 accent-[#9f5f36]"
          />
          {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          Hiển thị mật khẩu
        </label>

        <div className="rounded-lg bg-[#f5eadc] px-4 py-3 text-sm text-[#6d5a49]">
          <div className="flex items-start gap-2">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#9f5f36]" />
            <span>
              Mật khẩu mới cần tối thiểu 8 ký tự, có chữ hoa, chữ thường, số và
              ký tự đặc biệt.
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-[#9f5f36] px-6 py-3 font-bold text-white transition hover:bg-[#7d4525] focus:outline-none focus:ring-2 focus:ring-[#f7b267] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {submitting ? "Đang đổi mật khẩu..." : "Cập nhật mật khẩu"}
        </button>
      </form>
    </div>
  );
}

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  showPassword: boolean;
  error?: string;
  autoComplete: "current-password" | "new-password";
  onChange: (value: string) => void;
  inputClass: (hasError: boolean) => string;
}

function PasswordField({
  id,
  label,
  value,
  showPassword,
  error,
  autoComplete,
  onChange,
  inputClass,
}: PasswordFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-[#4b3525]">
        {label}
      </label>
      <input
        id={id}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass(Boolean(error))}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
